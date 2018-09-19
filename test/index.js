import test from 'ava';
import thinkPurify from '../index';

test('purify', t => {
  const purify = thinkPurify;
  t.is(typeof purify, 'object');
});

test('purify html5secVectors 1', t => {
  const input = '<form id="test"></form><button form="test" formaction="javascript:alert(1)">X</button>';
  const output = '<form id="test"></form><button form="test" formaction="x-javascript:alert(1)">X</button>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 2', t => {
  const input = '<meta charset="x-imap4-modified-utf7">&ADz&AGn&AG0&AEf&ACA&AHM&AHI&AGO&AD0&AGn&ACA&AG8Abg&AGUAcgByAG8AcgA9AGEAbABlAHIAdAAoADEAKQ&ACAAPABi';
  const output = '<meta charset="x-imap4-modified-utf7" />&ADz&AGn&AG0&AEf&ACA&AHM&AHI&AGO&AD0&AGn&ACA&AG8Abg&AGUAcgByAG8AcgA9AGEAbABlAHIAdAAoADEAKQ&ACAAPABi';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 3', t => {
  const input = '<meta charset="x-imap4-modified-utf7">&<script&S1&TS&1>alert&A7&(1)&R&UA;&&<&A9&11/script&X&>';
  const output = '<meta charset="x-imap4-modified-utf7" />&alert&A7&(1)&R&UA;&&&lt;&A9&11/script&X&>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 4', t => {
  const input = "0?<script>Worker(\"#\").onmessage=function(_)eval(_.data)</script> :postMessage(importScripts(\'data:;base64,cG9zdE1lc3NhZ2UoJ2FsZXJ0KDEpJyk\'))";
  const output = "0? :postMessage(importScripts(\'data:;base64,cG9zdE1lc3NhZ2UoJ2FsZXJ0KDEpJyk\'))";
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 5', t => {
  const input = "<script>crypto.generateCRMFRequest(\'CN=0\',0,0,null,\'alert(1)\',384,null,\'rsa-dual-use\')</script>";
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 6', t => {
  const input = '<script>({set/**/$($){_/**/setter=$,_=1}}).$=alert</script>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 7', t => {
  const input = '<input onfocus=write(1) autofocus>';
  const output = '<input autofocus />';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 8', t => {
  const input = '<input onblur=write(1) autofocus><input autofocus>';
  const output = '<input autofocus /><input autofocus />';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 9', t => {
  const input = "<a style=\"-o-link:\'javascript:alert(1)\';-o-link-source:current\">X</a>";
  const output = "<a style=\"-o-link:\'javascript:alert(1)\';-o-link-source:current\">X</a>";
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 10', t => {
  const input = '<video poster=javascript:alert(1)//></video>';
  const output = '<video poster="x-javascript:alert(1)//"></video>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 11', t => {
  const input = '<svg xmlns="http://www.w3.org/2000/svg"><g onload="javascript:alert(1)"></g></svg>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 12', t => {
  const input = '<body onscroll=alert(1)><br><br><br><br><br><br>...<br><br><br><br><input autofocus>';
  const output = '<body><br /><br /><br /><br /><br /><br />...<br /><br /><br /><br /><input autofocus /></body>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 13', t => {
  const input = '<x repeat="template" repeat-start="999999">0<y repeat="template" repeat-start="999999">1</y></x>';
  const output = '01';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 14', t => {
  const input = '<input pattern=^((a+.)a)+$ value=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!>';
  const output = '<input pattern="^((a+.)a)+$" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!" />';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 15', t => {
  const input = '<script>({0:#0=alert/#0#/#0#(0)})</script>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 16', t => {
  const input = 'X<x style=`behavior:url(#default#time2)` onbegin=`write(1)` >';
  const output = 'X';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 17', t => {
  const input = '<?xml-stylesheet href="javascript:alert(1)"?><root/>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 18', t => {
  const input = '<script xmlns="http://www.w3.org/1999/xhtml">&#x61;l&#x65;rt&#40;1)</script>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 19', t => {
  const input = '<meta charset="x-mac-farsi">\xBCscript \xBEalert(1)//\xBC/script \xBE';
  const output = '<meta charset="x-mac-farsi" />\xBCscript \xBEalert(1)//\xBC/script \xBE';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify  html5secVectors20', t => {
  const input = "<script>ReferenceError.prototype.__defineGetter__(\'name\', function(){alert(1)}),x</script>";
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 21', t => {
  const input = "<script>Object.__noSuchMethod__ = Function,[{}][0].constructor._(\'alert(1)\')()</script>";
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 22', t => {
  const input = '<input onblur=focus() autofocus><input>';
  const output = '<input autofocus /><input />';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 23', t => {
  const input = '<form id=test onforminput=alert(1)><input></form><button form=test onformchange=alert(2)>X</button>';
  const output = '<form id="test"><input /></form><button form="test">X</button>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 24', t => {
  const input = '1<set/xmlns=`urn:schemas-microsoft-com:time` style=`beh&#x41vior:url(#default#time2)` attributename=`innerhtml` to=`&lt;img/src=&quot;x&quot;onerror=alert(1)&gt;`>';
  const output = '1';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors html5secVectors 25', t => {
  const input = '<script src="#">{alert(1)}</script>;1';
  const output = ';1';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 26', t => {
  const input = '+ADw-html+AD4APA-body+AD4APA-div+AD4-top secret+ADw-/div+AD4APA-/body+AD4APA-/html+AD4-.toXMLString().match(/.*/m),alert(RegExp.input);';
  const output = '+ADw-html+AD4APA-body+AD4APA-div+AD4-top secret+ADw-/div+AD4APA-/body+AD4APA-/html+AD4-.toXMLString().match(/.*/m),alert(RegExp.input);';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 27', t => {
  const input = "<style>p[foo=bar{}*{-o-link:\'javascript:alert(1)\'}{}*{-o-link-source:current}*{background:red}]{background:green};</style>";
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 28', t => {
  const input = '1<animate/xmlns=urn:schemas-microsoft-com:time style=behavior:url(#default#time2) attributename=innerhtml values=&lt;img/src=&quot;.&quot;onerror=alert(1)&gt;>';
  const output = '1';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 29', t => {
  const input = '<link rel=stylesheet href=data:,*%7bx:expression(write(1))%7d';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 30', t => {
  const input = '<style>@import "data:,*%7bx:expression(write(1))%7D";</style>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 31', t => {
  const input = '<frameset onload=alert(1)>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 32', t => {
  const input = '<table background="javascript:alert(1)"></table>';
  const output = '<table background="x-javascript:alert(1)"></table>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 33', t => {
  const input = '<a style="pointer-events:none;position:absolute;"><a style="position:absolute;" onclick="alert(1);">XXX</a></a><a href="javascript:alert(2)">XXX</a>';
  const output = '<a style="pointer-events:none;position:absolute;"><a style="position:absolute;">XXX</a></a><a href="x-javascript:alert(2)">XXX</a>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 34', t => {
  const input = '1<vmlframe xmlns=urn:schemas-microsoft-com:vml style=behavior:url(#default#vml);position:absolute;width:100%;height:100% src=test.vml#xss></vmlframe>';
  const output = '1';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 35', t => {
  const input = '1<a href=#><line xmlns=urn:schemas-microsoft-com:vml style=behavior:url(#default#vml);position:absolute href=javascript:alert(1) strokecolor=white strokeweight=1000px from=0 to=1000 /></a>';
  const output = '1<a href="#"></a>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 36', t => {
  const input = '<a style="behavior:url(#default#AnchorClick);" folder="javascript:alert(1)">XXX</a>';
  const output = '<a style="behavior:url(#default#AnchorClick);" folder="x-javascript:alert(1)">XXX</a>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 37', t => {
  const input = '<!--<img src="--><img src=x onerror=alert(1)//">';
  const output = '<img src="x" />';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 38', t => {
  const input = '<comment><img src="</comment><img src=x onerror=alert(1)//">';
  const output = '<img src="%3C/comment%3E%3Cimg%20src=x%20onerror=alert(1)//" />';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 39', t => {
  const input = '<!-- up to Opera 11.52, FF 3.6.28 -->\r\n<![><img src="]><img src=x onerror=alert(1)//">\r\n\r\n<!-- IE9+, FF4+, Opera 11.60+, Safari 4.0.4+, GC7+ -->\r\n<svg><![CDATA[><image xlink:href="]]><img src=xx:x onerror=alert(2)//"></svg>';
  const output = '\n<img src="%5D%3E%3Cimg%20src=x%20onerror=alert(1)//" />\n\n\n';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 40', t => {
  const input = '<style><img src="</style><img src=x onerror=alert(1)//">';
  const output = '<img src="x" />';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 41', t => {
  const input = '<li style=list-style:url() onerror=alert(1)></li>\n<div style=content:url(data:image/svg+xml,%3Csvg/%3E);visibility:hidden onload=alert(1)></div>';
  const output = '<li style="list-style:url()"></li>\n<div style="content:url(data:image/svg+xml,%3Csvg/%3E);visibility:hidden"></div>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 42', t => {
  const input = '<head><base href="javascript://"/></head><body><a href="/. /,alert(1)//#">XXX</a></body>';
  const output = '<head><base href="x-javascript://" /></head><body><a href="/.%20/,alert(1)//#">XXX</a></body>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 43', t => {
  const input = '<?xml version="1.0" standalone="no"?>\r\n<html xmlns="http://www.w3.org/1999/xhtml">\r\n<head>\r\n<style type="text/css">\r\n@font-face {font-family: y; src: url("font.svg#x") format("svg");} body {font: 100px "y";}\r\n</style>\r\n</head>\r\n<body>Hello</body>\r\n</html>';
  const output = '\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n\n</head>\n<body>Hello</body>\n</html>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 45', t => {
  const input = "<style>*[{}@import\'test.css?]{color: green;}</style>X";
  const output = 'X';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 46', t => {
  const input = "<div style=\"font-family:\'foo[a];color:red;\';\">XXX</div>";
  const output = "<div style=\"font-family:\'foo[a];color:red;\';\">XXX</div>";
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 47', t => {
  const input = '<div style="font-family:foo}color=red;">XXX</div>';
  const output = '<div>XXX</div>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 48', t => {
  const input = '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 49', t => {
  const input = '<SCRIPT FOR=document EVENT=onreadystatechange>alert(1)</SCRIPT>';
  const output = '';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify html5secVectors 50', t => {
  const input = '<OBJECT CLASSID="clsid:333C7BC4-460F-11D0-BC04-0080C7055A83"><PARAM NAME="DataURL" VALUE="javascript:alert(1)"></OBJECT>';
  const output = '<object classid="clsid:333C7BC4-460F-11D0-BC04-0080C7055A83"><param name="DataURL" value="javascript:alert(1)" /></object>';
  const purify = thinkPurify.think.purify(input);
  t.is(purify, output);
});

test('purify context', t => {
  const input = '<form id="test"></form><button form="test" formaction="javascript:alert(1)">X</button>';
  const output = '<form id="test"></form><button form="test" formaction="x-javascript:alert(1)">X</button>';
  const purify = thinkPurify.context.purify(input);
  t.is(purify, output);
});

test('purify controller', t => {
  const input = '<form id="test"></form><button form="test" formaction="javascript:alert(1)">X</button>';
  const output = '<form id="test"></form><button form="test" formaction="x-javascript:alert(1)">X</button>';
  const purify = thinkPurify.controller.purify(input);
  t.is(purify, output);
});

test('purify service', t => {
  const input = '<form id="test"></form><button form="test" formaction="javascript:alert(1)">X</button>';
  const output = '<form id="test"></form><button form="test" formaction="x-javascript:alert(1)">X</button>';
  const purify = thinkPurify.service.purify(input);
  t.is(purify, output);
});
