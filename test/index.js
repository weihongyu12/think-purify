import test from 'ava';
import thinkPurify from '../index';

test('purify', t => {
  const purify = thinkPurify;
  t.is(typeof purify, 'object');
});

test('purify whitelist', t => {
  const data = '<div>test</div>';
  const purify = thinkPurify.think.purify(data);
  t.is(purify, '<div>test</div>');
});

test('purify blacklist', t => {
  const data = '<div><iframe src="http://example.com"></iframe></div>';
  const purify = thinkPurify.think.purify(data);
  t.is(purify, '<div></div>');
});

test('purify context', t => {
  const data = '<div><iframe src="http://example.com"></iframe></div>';
  const purify = thinkPurify.context.purify(data);
  t.is(purify, '<div></div>');
});

test('purify controller', t => {
  const data = '<div><iframe src="http://example.com"></iframe></div>';
  const purify = thinkPurify.controller.purify(data);
  t.is(purify, '<div></div>');
});
