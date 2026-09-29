// web/tests/sigv4.test.mjs
//
// Verifies providers/lib/sigv4.js against the OFFICIAL AWS SigV4 test suite
// vectors ("aws-sig-v4-test-suite"), not a self-consistency check.
//
// The literal expected strings below were fetched verbatim (via curl, not
// paraphrased) from the get-vanilla / post-vanilla / get-vanilla-query-order-key
// fixtures of the public aws-sig-v4-test-suite as mirrored at
// https://github.com/mhart/aws4/tree/master/test/aws-sig-v4-test-suite
// and the credentials used by that suite's own test runner
// (test/fast.js: CREDENTIALS = {accessKeyId:'AKIDEXAMPLE', secretAccessKey:
// 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY'}, SERVICE='service',
// DATETIME='20150830T123600Z').

import test from 'node:test';
import assert from 'node:assert/strict';
import { signRequest, canonicalUri, canonicalQuery, sha256Hex } from '../assets/js/providers/lib/sigv4.js';

const ACCESS_KEY_ID = 'AKIDEXAMPLE';
const SECRET_ACCESS_KEY = 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY';
const REGION = 'us-east-1';
const SERVICE = 'service';
const DATETIME = '20150830T123600Z';

// --- get-vanilla ------------------------------------------------------------
const GET_VANILLA = {
  creq: [
    'GET',
    '/',
    '',
    'host:example.amazonaws.com',
    'x-amz-date:20150830T123600Z',
    '',
    'host;x-amz-date',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  ].join('\n'),
  sts: [
    'AWS4-HMAC-SHA256',
    '20150830T123600Z',
    '20150830/us-east-1/service/aws4_request',
    'bb579772317eb040ac9ed261061d46c1f17a8133879d6129b6e1c25292927e63',
  ].join('\n'),
  signature: '5fa00fa31553b73ebf1942676e86291e8372ff2a2260956d9b8aae1d763fbf31',
  signedHeaders: 'host;x-amz-date',
};

// --- post-vanilla ------------------------------------------------------------
const POST_VANILLA = {
  creq: [
    'POST',
    '/',
    '',
    'host:example.amazonaws.com',
    'x-amz-date:20150830T123600Z',
    '',
    'host;x-amz-date',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  ].join('\n'),
  sts: [
    'AWS4-HMAC-SHA256',
    '20150830T123600Z',
    '20150830/us-east-1/service/aws4_request',
    '553f88c9e4d10fc9e109e2aeb65f030801b70c2f6468faca261d401ae622fc87',
  ].join('\n'),
  signature: '5da7c1a2acd57cee7505fc6676e4e544621c30862966e37dddb68e92efbe5d6b',
};

// --- get-vanilla-query-order-key ---------------------------------------------
const GET_VANILLA_QUERY_ORDER_KEY = {
  url: 'https://example.amazonaws.com/?Param1=value2&Param1=Value1',
  creq: [
    'GET',
    '/',
    'Param1=Value1&Param1=value2',
    'host:example.amazonaws.com',
    'x-amz-date:20150830T123600Z',
    '',
    'host;x-amz-date',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  ].join('\n'),
  sts: [
    'AWS4-HMAC-SHA256',
    '20150830T123600Z',
    '20150830/us-east-1/service/aws4_request',
    '704b4cef673542d84cdff252633f065e8daeba5f168b77116f8b1bcaf3d38f89',
  ].join('\n'),
  signature: 'eedbc4e291e521cf13422ffca22be7d2eb8146eecf653089df300a15b2382bd1',
};

test('sigv4: get-vanilla matches official AWS test vector exactly', async () => {
  const signed = await signRequest({
    method: 'GET',
    url: 'https://example.amazonaws.com/',
    region: REGION,
    service: SERVICE,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    headers: {},
    body: '',
    datetime: DATETIME,
  });

  assert.equal(signed.canonicalRequest, GET_VANILLA.creq, 'canonical request must match official vector');
  assert.equal(signed.stringToSign, GET_VANILLA.sts, 'string-to-sign must match official vector');
  assert.equal(signed.signature, GET_VANILLA.signature, 'signature must match official vector');
  assert.equal(signed.signedHeaders, GET_VANILLA.signedHeaders);
  assert.equal(
    signed.headers.Authorization,
    `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY_ID}/20150830/us-east-1/service/aws4_request, ` +
      `SignedHeaders=host;x-amz-date, Signature=${GET_VANILLA.signature}`,
  );
});

test('sigv4: post-vanilla matches official AWS test vector exactly', async () => {
  const signed = await signRequest({
    method: 'POST',
    url: 'https://example.amazonaws.com/',
    region: REGION,
    service: SERVICE,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    headers: {},
    body: '',
    datetime: DATETIME,
  });

  assert.equal(signed.canonicalRequest, POST_VANILLA.creq);
  assert.equal(signed.stringToSign, POST_VANILLA.sts);
  assert.equal(signed.signature, POST_VANILLA.signature);
});

test('sigv4: get-vanilla-query-order-key matches official AWS test vector (query canonicalization + sorting)', async () => {
  const signed = await signRequest({
    method: 'GET',
    url: GET_VANILLA_QUERY_ORDER_KEY.url,
    region: REGION,
    service: SERVICE,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    headers: {},
    body: '',
    datetime: DATETIME,
  });

  assert.equal(signed.canonicalRequest, GET_VANILLA_QUERY_ORDER_KEY.creq);
  assert.equal(signed.stringToSign, GET_VANILLA_QUERY_ORDER_KEY.sts);
  assert.equal(signed.signature, GET_VANILLA_QUERY_ORDER_KEY.signature);
});

test('sigv4: canonicalUri and canonicalQuery unit behavior', () => {
  assert.equal(canonicalUri(''), '/');
  assert.equal(canonicalUri('/'), '/');
  assert.equal(canonicalUri('/a/b c'), '/a/b%20c');
  assert.equal(canonicalQuery(''), '');
  assert.equal(canonicalQuery('?b=2&a=1'), 'a=1&b=2');
});

test('sigv4: sha256Hex of empty string is the well-known SHA-256 empty digest', async () => {
  assert.equal(await sha256Hex(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
});

test('sigv4: session token adds X-Amz-Security-Token to signed headers', async () => {
  const signed = await signRequest({
    method: 'GET',
    url: 'https://example.amazonaws.com/',
    region: REGION,
    service: SERVICE,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    sessionToken: 'FAKE-SESSION-TOKEN',
    headers: {},
    body: '',
    datetime: DATETIME,
  });
  assert.match(signed.signedHeaders, /x-amz-security-token/);
  assert.equal(signed.headers['X-Amz-Security-Token'], 'FAKE-SESSION-TOKEN');
});

test('sigv4: throws without credentials or region/service', async () => {
  await assert.rejects(() =>
    signRequest({ url: 'https://example.amazonaws.com/', region: REGION, service: SERVICE }),
  );
  await assert.rejects(() =>
    signRequest({
      url: 'https://example.amazonaws.com/',
      accessKeyId: 'a',
      secretAccessKey: 'b',
    }),
  );
});
