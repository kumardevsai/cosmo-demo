/* (c) 2013 JiaThis Inc. 1205*/
eval(function(p, a, c, k, e, r) {
	e = function(c) {
		return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
	};
	if (!''.replace(/^/, String)) {
		while (c--) r[e(c)] = k[c] || e(c);
		k = [
			function(e) {
				return r[e]
			}
		];
		e = function() {
			return '\\w+'
		};
		c = 1
	};
	while (c--)
		if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	return p
}('N 1b={73:"1B://1h.1J.Z",4Q:"1B://l.1J.Z",3A:"1B://s.1J.Z",74:20,21:"",75:1c,1S:76,4R:"77",4S:"4T",3B:"",30:[],3C:{\'78\':\'一键分享,79\',\'7a\':\'猜你喜欢,7b\',\'7c\':\'复制网址,7d\',\'7e\':\'收藏夹,7f\',\'7g\':\'打印,dy\',\'7h\':\'邮件,7i\',\'7j\':\'2o空间,7k,4U.2p.1K.Z\',\'7l\':\'新浪微博,7m,7n.Z\',\'7o\':\'微信,7p,2c,2c.1K.Z\',\'7q\':\'腾讯微博,7r,t.1K.Z\',\'7s\':\'搜狐微博,7t,t.4V.Z\',\'7u\':\'网易微博,7v,t.4W.Z\',\'7w\':\'人人网,7x,1h.2C.Z\',\'7y\':\'开心网,7z,1h.31.Z\',\'7A\':\'7B+,7C,7D.17.3D.Z\',\'7E\':\'轻笔记,7F\',\'7G\':\'淘江湖,7H,i.3E.Z\',\'7I\':\'豆瓣,db,1h.3F.Z\',\'7J\':\'朋友网,7K,32.7L.Z\',\'7M\':\'麦库记事,7N\',\'7O\':\'百度搜藏,7P,7Q.33.Z\',\'7R\':\'有道云笔记,7S,7T.4X.Z\',\'7U\':\'手机快传,7V\',\'7W\':\'天涯社区,7X,4Y.7Y.cn\',\'7Z\':\'飞信,fx,80.81.82.cn\',\'83\':\'百度贴吧,84,4Z.33.Z\',\'85\':\'凤凰微博,86,t.52.Z\',\'87\':\'优士网,88,1h.89.cn\',\'8a\':\'饭否,ff,8b.Z\',\'8c\':\'点点网,8d,1h.8e.Z\',\'8f\':\'明道,8g,1h.8h.Z\',\'8i\':\'中搜v商,8j,8k.8l\',\'8m\':\'奇乐收藏,8n,1h.8o.Z\',\'8p\':\'谷歌,8q\',\'8r\':\'谷歌8s,8t\',\'8u\':\'有道书签,8v,53.4X.Z\',\'8w\':\'2o好友,8x,8y,54.1K.Z\',\'8z\':\'2o书签,8A,53.1K.Z\',\'8B\':\'34,55\',\'8C\':\'8D,8E\',\'8F\':\'花瓣网,8G,8H.Z\',\'8I\':\'堆糖,dt,1h.8J.Z\',\'8K\':\'粉丝网,8L,8M.8N.Z\',\'8O\':\'摇篮微博,8P\',\'8Q\':\'8R收藏,8S\',\'8T\':\'百度空间,8U,8V.56.33.Z\',\'8W\':\'8X邮箱,8Y,57.3D.Z\',\'8Z\':\'90邮箱,91\',\'92\':\'雪球,93,94.Z\',\'95\':\'和讯,96,97.58.Z\',\'98\':\'南方微博,99\',\'9a\':\'59邮箱,9b\',\'9c\':\'5a邮箱,9d\',\'9e\':\'爱分享,9f\',\'9g\':\'9h+分享,9i,9j,i.9k.Z.cn\',\'9l\':\'翼友圈,9m,9n.5a.cn\',\'9o\':\'移动微博,9p\',\'9q\':\'人民微博,9r,t.9s.Z.cn\',\'9t\':\'中金微博,9u\',\'9v\':\'新华微博,9w\',\'9x\':\'财迷,cm,t.9y.Z\',\'9z\':\'谷歌翻译,9A\',\'9B\':\'推他,9C,1h.9D.Z\',\'9E\':\'猫扑推客,9F,9G.9H.Z\',\'9I\':\'嘀咕网,9J,9K.Z\',\'9L\':\'鲜果,9M\',\'9N\':\'发现啦,9O\',\'9P\':\'赶牛网,9Q,1h.9R.Z\',\'9S\':\'米聊,9T\',\'9U\':\'搜狐随身看,9V\',\'9W\':\'51社区,9X,9Y.51.Z\',\'9Z\':\'凤凰快博,a0,k.52.Z\',\'a1\':\'法律微博,a2\',\'a3\':\'光明网,a4\',\'a5\':\'人间网,a6,a7.Z\',\'a8\':\'雷猴网,a9,aa.Z\',\'ab\':\'和讯微博,ac,t.58.Z\',\'ad\':\'游戏江湖,ae,56.4W.Z\',\'af\':\'玛撒网,ag\',\'ah\':\'宾至网,ai,1h.aj.Z\',\'ak\':\'al,5b,1h.5b.Z\',\'am\':\'ao,ap,t.co\',\'aq\':\'ar,5c,1h.5c.Z\',\'as\':\'at,au\',\'av\':\'aw,5d,1h.5d.Z\',\'ax\':\'ay,az,aA.Z\',\'aB\':\'若邻网,aC\',\'aD\':\'乐收,aE,aF.aG.Z\',\'aH\':\'挖客网,aI\',\'aJ\':\'创业邦,aK,u.aL.cn\',\'aM\':\'救救地球,aN\',\'aO\':\'抽屉网,aP\',\'aQ\':\'递客网,aR,1h.aS.cn\',\'aT\':\'豆瓣9点,aU,9.3F.Z\',\'aV\':\'美丽说,aW\',\'aX\':\'蘑菇街,aY,aZ.cn\',\'b0\':\'天际网,b1,b2.b3.Z\',\'b4\':\'b5网,b6,4Y.b7.cn\',\'b8\':\'宝盒网,b9,1h.ba.Z\',\'bb\':\'易集网,bc,1h.bd.Z\',\'be\':\'bf在线转换,bg\',\'bi\':\'友好打印,bj\',\'bk\':\'bl验证,bm\',\'bn\':\'bo.5e,bp,bq.5e\',\'br\':\'bs,5f,5f.Z\',\'bu\':\'bv.5g,57.5g\',\'bw\':\'bx,by\',\'bz\':\'bA,bB\',\'bC\':\'bD,bE\',\'bF\':\'bG,bH\',\'bI\':\'bJ,bK\',\'bL\':\'bM,bN\',\'bO\':\'bP,bQ\',\'bR\':\'bS,bT\',\'bU\':\'bV,bW\',\'bX\':\'bY.fm,bZ.fm\',\'c0\':\'c3,c4\',\'c5\':\'c6,5h,1h.5h.Z\',\'c7\':\'c8 c9,ca\',\'cb\':\'cc,cd\',\'ce\':\'cf,cg\',\'ch\':\'cj,ck\',\'cl\':\'cp,cq\',\'cr\':\'cs,ct\'}};(11(){N I=1a.2q(\'22\');1f(N i=0,ci;ci=I[i++];){L(/1J.Z/.1L(ci.1m)){1b.21=ci.1m.5i(0,ci.1m.cv("/"));ci.1m.2r(/(1S)=([^&]+)/g,11(a,p,v){1b[p]=v})}}N d=1a,3G=d.cw=="cx",dd=d.5j,db=d.35,m=23.5k,3H=!!d.5l,3I=2s.2t.3J(),24=d.2q("24")[0]||dd,36=1p.1T.37,1n=(2d(2D)==\'1U\')?{}:2D,25=1b.4R,1M=1b.3C,5m=d.cy,3K=1c,5n=11(){15{h:(3G?dd:db).cz,w:(3G?dd:db).cA}},39=11(){15{t:m(dd.2E,db.2E),l:m(dd.3L,db.3L)}},5o=11(a){N r={t:0,l:0},5p=/cB/.1L(3I),2u=11(t,l){r.l+=l,r.t+=t},p=a,3M=39();L(a&&a!=db){L(a.5q){N b=a.5q();L(b.1q==b.5r){N g=a.13.1e;a.13.1e="2e";b.1q=b.1q-a.1V;a.13.1e=g}2u(b.1q+3M.t-dd.cC,b.1N+3M.l-dd.cD)}14{N c=d.cE;3N(p){2u(p.5s,p.5t);N e=c.cF(p,20);L(5p){N f=1u(e.3O("26-1N-1o"),10)||0,bt=1u(e.3O("26-1q-1o"),10)||0;2u(bt,f);L(p!=a&&e.3O("2F")!="cG"){2u(bt,f)}}p=p.cH}p=a.3a;3N(p&&p!=db){2u(-p.2E,-p.3L);p=p.3a}}}15 r},1v=11(o,t,a){N b=d.2G(t||"18");1f(N p 1D o){p=="13"?(b[p].5u=o[p]):(b[p]=o[p])}15(a||db).cI(b,(a||db).2H)},5v=11(a,b){N c={};1f(N i=0;i<a.1r;i++){c[a[i]]=1}1f(N i=0;i<b.1r;i++){L(!c[b[i]]){a.5w(b[i]);c[b[i]]=1}}15 a},5x=11(a,b,c){N d=2v 3P();d.cJ(d.3Q()+c*3b);1a.5y=a+"="+5z(b)+(c?";cK="+d.cL():"")+";3R=/"},5A=11(a){N b=1a.5y;N c=b.1w(a+"=");L(c!=-1){c+=a.1r+1;N d=b.1w(";",c);L(d==-1){d=b.1r}15 cM(b.5i(c,d))}15""},3c=11(w,d,a){w/=d;w=23.3S(w*10)/10;L((w+"").1r>=4){w=23.3S(w)}15 w+a},5B=11(a){N d=(""+a).1i(".").3d().1r;L(cN(a)){15\'0\'}14{L(d<4){15 23.3S(a)}14{L(d<7){15 3c(a,3b,"K")}14{L(d<10){15 3c(a,cO,"M")}14{15 3c(a,3T,"B")}}}}},3U=11(X){N A={},D=(2v 3P()).3Q(),E,F,G,H,V=2I(X);L(V!==1U&&V.1w("|")>-1){E=V.1i(\'|\');F=E[0];G=E[1];H=23.cP((D-G)/3b);A.1z=1u(F);A.cQ=G;A.5C=H;15 A}15 1c},3e=11(){N A=5A("5D"),B={};L(A){B=3V("("+A+")")}15 B},5E=11(U,S,T){N A=3e();L(A[U]){cR A[U]}$1g.1z=1u(S);A[U]=\'"\'+1u(S)+\'|\'+T+\'"\';5x("5D",5F(A),0)},5F=11(o){N A=\'\',B=\'\';1f(N k 1D o){A+=B+\'"\'+k+\'":\'+o[k];B=!B?\',\':B}15"{"+A+"}"},3W=11(a,b){1f(N k 1D a){N c=d.2f(a[k]);L(c){c.1d=\'累计分享\'+b+\'次\';c.1x=5B(b)}}},5G=11(){N u=1n.cS;L(u){L(!(u cT 5H)){u=[u]}1f(N a=0;a<u.1r;a++){N c=u[a];L(c.2g&&c.3X&&c.17){c.2h=c.17=c.17.2r(/ /g,"");c.2h=c.2h.1i("//").2J().1i("?").3d().1i("/").3d().3J();1b.30[c.2h]=c;1b.3C[25+c.2h]=c.2g+\',\'+c.2h+\',\'+c.2h}}}},3Y=11(a,b,c){N d="";do{d=a[b++]}3N(b<a.1r&&(!1M[25+d]||c[d]));L(c[d]||!1M[25+d]){d=\'\';1f(N k 1D 1M){k=k.2K(3);L(!c[k]&&1M[25+k]){d=k;3Z}}}15 d},40=11(){5G();N e=1n.cU||{},41=1n.cV||1c;e.cW&&1v({1m:1b.21+"/cX.cY.2L",2i:"2j-8"},"22",24);N f=1n.5I?1y:1c;L(1b.1S&&36&&!f){N g=1y;L(2d(1n.5I)==\'1U\'){N j=[\'cZ.Z\',\'d0.Z\',\'3E.Z\',\'d3.cn\',\'d4.Z\',\'d5.Z\',\'d6.Z\',\'d7.Z\',\'d8.Z\',\'d9.Z\'];1f(N k 1D j){L(2d(j[k])==\'da\'){L(36.1W(2v 42(j[k]))){g=1c;3Z}}}}L(g){1v({1m:"1B://dc.1K.Z/1J.3f?1S="+1u(1b.1S)+"&dm="+36,2i:"2j-8"},"22")}}N l="2p,43,de,2c,2C,31,df,dg,3F,3E,dh,55,59,4V,4Z,33,3D",5J=1b.3B||l,44=5v(5J.1i(","),l.1i(",")),2M={},27={},h=d.2q("a"),5K=2I(1n.17||d.1T),3g=20,19,1E,1C,fl,bt,28;1f(N i=0,ci,1j;ci=h[i++];){L(/\\di\\b/.1L(ci.1l)){ci.5L=$1g.45;ci.dj=$1g.5M;!41&&(ci.2w=$1g.3h);ci.5N=$1g.5O;ci.dk=1y;5P}L(ci.1l&&(1j=ci.1l.1W(/^5Q(\\w+)(?:\\dl|$)(.*)$/))&&1j[1]){L(2d($1g.2N)=="5R"){L(!3g){3g=1v({2x:1b.21+"/2y/46.2y",3i:"5S",1X:"1Y/2y"},"5T")}L(ci.2H&&ci.2H.dn==3){ci.5U(ci.2H)}L(!ci.2H){N B=1j[1]==\'13\'?\'dp\':1j[1],C=1j[2]?1j[2]:\'\',K="5Q"+i,E=d.2G("1F");E.1l=\'dq 46 dr\'+B+\'ds\';!41&&(E.2w=11(){$1g.3h()});E.1G=K;E.2k(d.du("0"));L(C){E.13.5u=C}ci.2k(E)}$1g.2N.5w(K)}5P}19=\'\',1E=\'\',1C=1c,fl=1c,bt=1c,28=1c;L(ci.1l&&(1j=ci.1l.1W(/^dv([\\w\\.]+)(?:\\s|$)/))&&1j[1]){L(1j[1].1w("5V")>-1||1j[1].1w("dw")>-1){L(1j[1].1w("5V")>-1){1C=1y;N s=ci.1l.1W(/dx([0-9]+)(?:\\s|$)/)}14{N s=ci.1l.1W(/dz([0-9]+)(?:\\s|$)/)}N n=((s&&s.1r)?23.dA(16,23.5k(1,1u(s[1]))):1)-1;19=3Y(44,n,2M);28=1y}14{19=1j[1]}bt=1y}L(ci.1l&&(1j=ci.1l.1W(/^dB(\\w+)$/))&&1j[1]){19=1j[1];fl=1y}L(19&&1M[25+19]){bt&&(2M[19]=1);N p=11(a,b){1f(N c 1D b){N o=b[c];L(o.28&&o.19==a){15 c}}15 1c},w=p(19,27);L(w!==1c){N T=27[w]||{};L(T.19&&T.ci){47=3Y(44,0,2M);T.bt&&(2M[47]=1);27[w]={"ci":T.ci,"19":47,"bt":T.bt,"fl":T.fl,"1C":T.1C,"28":T.28}}}27[i]={"ci":ci,"19":19,"bt":bt,"fl":fl,"1C":1C,"28":28}}14 L(bt||fl){ci.1x=""}L(ci.1l&&(1j=ci.1l.1W(/^dC(\\w+)$/))&&1j[1]){1E=1j[1];N o=5W(ci,\'2O\'),2l=\'\',29=5K,2m=\'\';L(1E==\'2p\'){N q=1O(o.1K,1c);L(q){29="1B://dD.2p.1K.Z/"+q;2l=\'1B://2z.2p.1K.Z/2a?17=\'+1H(29)+\'&1X=\'+1O(o.1X,\'dE\')}14{2l=\'1B://4U.2p.1K.Z/dF-dG/dH/dI?17=\'+1H(29)+\'&5X=\'+1O(o.5X,1)+\'&13=\'+1O(o.13,2)}}14 L(1E==\'2C\'){N r=1O(o.dJ,1c);29=r?("1B://dK.2C.Z/"+r):29;2l=\'1B://1h.54.2C.Z/2a?17=\'+1H(29)+\'&5Y=\'+1O(o.5Y,\'1c\')}14 L(1E==\'31\'){2l=\'1B://1h.31.Z/2a/2a.3f?17=\'+1H(29)+\'&5Z=\'+1O(o.5Z,\'1c\')}14 L(1E==\'43\'||1E==\'48\'){N t=49(),1s=\'\',1d=1n.1d||1a.1d,t=1n.2b==1U?t:1n.2b,1s=1n.1s==1U?4a():1n.1s,17=1n.17==1U?1a.1T:1n.17}L(2l){ci.1x=\'<1F 1P="2P 3j 4b"><1I 1m="\'+2l+\'" dL="1y" dM="61" 26="0" dN="0" 13="1o:\'+1O(o.1o,dO)+\'1A;1k:\'+1O(o.1k,38)+\'1A;\'+2m+\'"></1I></1F>\'}14{L(1E==\'48\'||1E==\'43\'){L(1E==\'48\'){ci.1x=\'<1F 1P="2P 3j 4b"><2Q:2a 1X="1Y"></2Q:2a></1F>\'}14{ci.1x=\'<1F 1P="2P 3j 4b"><2Q:2a 1X="dP"></2Q:2a></1F>\'}N u=[\'2R:1X=dQ\',\'2R:17=\'+1H(17)+\'\',\'2R:1d=\'+1H(1d)+\'\',\'2R:dR=\'+1H(1s)+\'\',\'2R:2S=\'+1H(t)+\'\'];1f(m=0;m<u.1r;m++){3k=1a.2G(\'62\');N v=u[m].1i(\'=\');N w=v[0];N x=v[1];3k.dS(\'dT\',w);3k.2T=dU(x);24.2k(3k)}1v({1m:"1B://dV.dW.dX.cn/2z/dY/2L/2Q.2L",2i:"2j-8",1X:"1Y/dZ"},"22")}14{ci.1x=\'\'}}}}L(27){1f(N k 1D 27){N o=27[k],ci=o.ci,bt=o.bt,fl=o.fl,1C=o.1C,19=o.19;L(2d(ci)=="5R"&&ci.1x.1w(\'4c 4d\')==-1){N y=1M[25+19].1i(\',\');N z=ci.1x.2r(/^\\s+|\\s+$/g,"");N A=1b.30[19]||{};N D=(A.3X)?\' 13="4e:17(\'+A.3X+\') 61-e0 1N;"\':\'\';L(1C||z){z=z?z:y[0];ci.1x=\'<1F 1P="2P 3j 4c 4d\'+19+\'"\'+D+\'>\'+z+\'</1F>\'}14{ci.1x=\'<1F 1P="2P 4c 4d\'+19+\'"\'+D+\'></1F>\'}L(fl){ci.2w=11(a){15 11(){L(a.1l.1W(/2c$/)){4f(a.3i)}14{1p.2z(a.3i,\'\')}}}(ci);ci.1d=ci.1d?ci.1d:"在"+y[0]+"关注我们"}14{ci.2w=11(a){15 11(){63(a)}}(19);L(!ci.1d){L(19==\'4g\'||19==\'4h\'){ci.1d=y[0]}14 L(19==\'4i\'){ci.1d="加入"+y[0]}14{ci.1d="分享到"+y[0]}}}}}}L(3g){$1g.64()}},1O=11(v,a){L(v===1U){15 a}15 v},5W=11(a,b){N p=[],c=a.e1[b];L(c){o=c.e2.1i(\'&\')||\'\';1f(N i=o.1r;i--;){N j=o[i].1i(\'=\');p[j[0]]=j[1]}}15 p},4j=11(e){L(!3K){L(!!e.65&&e.65.2K(-12)==".1J.Z"){L(e.2O&&e.2O!="e3"){1b.3B=e.2O}}40();66();3K=1y}},66=11(){N a,s,E=1H,o=67(5m),T=1a.1d||"",Y=1p.1T.2x||"",an=Y?Y.1w(1b.4S):-1,d1=4k(o.37),d2=4k(Y),q=20,f=(d1&&d2&&d1==d2)?1c:1y;L(an>-1){a=Y.68(an);q=a.1i("#").2J().1i("-").2J().1i("=").2J();q=1M[25+q]?q:\'\'}q=(!q&&o.19)?o.19:q;L(q&&f){s=\'e4=\'+q+\'&e5=\'+1u(1b.1S)+\'&e6=\'+E(o.37)+\'&e7=\'+E(o.3R)+\'&e8=\'+E(Y)+\'&e9=\'+5z(T);(2v ea).1m=1b.4Q+"/l.eb?"+s}},4k=11(o){N d=20;L(o){d=o.1i(".").2K(-2).69(".");d=(d=="Z.cn")?o.1i(".").2K(-3).69("."):d;d=d.1i("/").3d()}15 d},67=11(r){N h="",p="",q="",m;L(r.1W(/(?:[a-z]\\:\\/\\/)([^\\/\\?]+)(.*)/ec)){h=42.$1;p=42.$2;h=h?h:"";p=p?p:"";L(h){1f(N k 1D 1M){m=1M[k].1i(\',\');L(m[2]&&m[2]==h){q=k.2K(3);3Z}}}}15{37:h,3R:p,19:q}},ed=!!1p.6a?1v({13:"1e:1Q;",6b:0,1m:1b.21+"/ee.ef"},"1I"):20,18=1v({1l:"6c",13:"2n:3l;z-6d:3T;1e:1Q;2F:6e;"}),1t=1v({1l:"6c",13:"2n:3l;z-6d:3T;1e:1Q;1q:50%;1N:50%;2F:6e;"}),1I=1v({13:"2n:"+(/eg/.1L(3I)?"4l":"3l")+";1e:1Q;eh:ei(4m=0);4m:0",6b:0},"1I"),3m,4n,2U,4o,h,2V={},1Z,4p;1v({2x:1b.21+"/2y/ej.2y",3i:"5S",1X:"1Y/2y"},"5T");$1g={3n:"",2J:18,ek:1t,1z:0,2N:[],4q:11(a){N b=1p.el||a,t=b.em||b.4r,3o=t.6f?t.6f.en():"",c=18.3p?18.3p(t):!!(18.6g(t)&16),c1=1t.3p?1t.3p(t):!!(1t.6g(t)&16),c2=1y;L(3o=="eo"){c2=t.3a.1l.1w("1J")=="-1"}14 L(3o=="A"){c2=t.1l.1w("1J")=="-1"}14 L(3o=="ep"){c2=t.1l.1w("46")=="-1"}L(!c&&!c1&&c2){1I.13.1e=1t.13.1e=\'1Q\'}},5O:11(){N s,T=6h,4s,fn=11(){4s=eq(11(){L(18.1x){N p=5o(T),6i=5n(),1C=39();4t(18.13){1e="2e";N a=T.13.1e;T.13.1e="2e";1q=(p.t+T.1V+18.1V>6i.h+1C.t?p.t-18.1V:p.t+T.1V)+"1A";1N=p.l+"1A";T.13.1e=a}4t(1I.13){1q=18.5s+"1A";1N=18.5t+"1A";1o=18.3q+"1A";1k=18.1V+"1A";1R="";1e="2e"}er(4s)}},50)};L(!1Z){1Z=1v({1m:1b.21+"/es.2L",2i:"2j-8"},"22",24);1Z.4u=0;1Z.et=11(){1Z.4u=1;!3H&&fn()};1Z.eu=11(){/ev|ew/.1L(1Z.ex)&&!1Z.4u&&fn()}}14{fn()}15 1c},45:11(){3m=4v(11(){18.13.1e="1Q";1t.13.1e!="2e"&&(1I.13.1e="1Q")},4w)},5M:11(){4x(3m)},3h:11(){18.13.1e=1I.13.1e="1Q";L(!4p){4p=1v({1m:1b.21+"/ey.2L",2i:"2j-8"},"22",24);db.13.2n="ez"}14{N a=39();1t.13.1e="2e";1t.13.1R=(-1t.1V/2+a.t)+"1A "+(-1t.3q/2+a.l)+"1A";2U=d.2f("eA"),4o=2U.4y(1y),h=4o.2q("eB");1f(N i=0,ci;ci=h[i++];){2V[ci.6j]=ci.3a}4t(1I.13){1N=1q="50%";1o=1t.3q+"1A";1k=1t.1V+"1A";1R=1t.13.1R;1e="2e"}}15 1c},eC:11(o){4x(4n);4n=4v(11(){N s=o.6j.2r(/^\\s+|\\s+$/,""),4z=d.eD();1f(N p 1D 2V){3V("N f = /"+(s||".")+"/eE.1L(p)");!!2V[p].4y&&(f&&4z.2k(2V[p].4y(1y)))}2U.1x="";2U.2k(4z)},4w)},eF:11(){1I.13.1e=1t.13.1e="1Q"},6k:11(o){L(o.1z!==1U){N A=$1g.2N,B=1u(o.1z),C=2I(1n.17||d.1T),D=3e(),J=3U(D[C]),T=(2v 3P()).3Q(),S=B;L(J&&J.1z>B){S=J.1z}5E(C,S,T);3W(A,S)}},64:11(){N A=$1g.2N,B=3e(),C=2I(1n.17||d.1T),J=3U(B[C]),R=1y;L(J&&J.5C<=60){$1g.1z=J.1z;3W(A,J.1z);R=1c}L(R){1v({1m:"//i.1J.Z/17/1z.3f?17="+1H(C),2i:"2j-8"},"22",24)}},2z:11(A){1v({1m:A,2i:"2j-8"},"22",24)},6l:11(F,O){L(F){F=2d(F)=="11"?F:3V(F);F(O)}}};L(!!1p.3r){!!1p.3r&&1p.3r("eG",4j,1c)}14{L(!!1p.6a){(!!1p.4A&&1p.4A("eH",4j))}14{40()}}18.5N=11(){4x(3m)};18.5L=11(){$1g.45()};3H?d.4A("2w",$1g.4q):d.3r("eI",$1g.4q,1c)})();11 63(a){N b=49(),1s=4a();4B{N c=2D||{}}4C(e){N c={}};N d=1H,cu=1b.30[a]||{},U=2I(c.17||1a.1T),W="?19="+a,G="&17="+d(U),T="&1d="+d(c.1d||1a.1d),S=c.2b?"&2b="+d(c.2b):(b?"&2b="+d(b):""),F=1b.1S?"&1S="+1u(1b.1S):"",E=c.eJ?"&4T=1":"",K=(c.3s&&c.3s[a])?"&3s="+c.3s[a]:"",P=c.1s?"&1s="+d(c.1s):(1s?"&1s="+d(1s):\'\'),C=$1g.3n?"&3n="+$1g.3n:"",R=(c.3t&&c.3t[a])?"&3t="+c.3t[a]:"",Q=(c.4D&&c.4D[\'32\'])?c.4D[\'32\']:20,A=\'1B://s.1J.Z/\',X=(cu.2g&&cu.17)?"&eK="+d(cu.2g)+"&eL="+d(cu.17):"",6m=c.eM==1c?\'\':\'&eN=1\';B=A+W+G+T+F+E+K+P+R+S+X+C+6m;L(a==\'4g\'||a==\'4i\'||a==\'4h\'||a==\'2c\'){$1g.2z(B);L(a==\'4g\'){6n()}14 L(a==\'4i\'){6o()}14 L(a==\'2c\'){6p=c.1d||1a.1d;6q=c.2b?c.2b:(b?b:"");6r=G.2r(\'&17=\',\'\');6s=6p+6q;6t=6u(6s,eO);6v(d(6t+\'...\'),6r)}14{1p.4h()}}14{1p.2z(B,\'\')}$1g.6k({1z:($1g.1z+1)});$1g.6l(Q,{1X:\'32\',2O:{eP:a,17:U}});15 1c}11 6o(){4B{N d=2D||{}}4C(e){N d={}};N a=d.1d||1a.1d;N b=d.17||eQ.1T.2x;N c=1p.eR;L(c&&!!c.6w){c.6w(a,b,"")}14 L(1a.5l){1p.eS.eT(b,a)}14{3u(\'请按 6x + D 为你的浏览器添加书签！\')}}11 6n(){4B{N d=2D||{}}4C(e){N d={}};N a=d.17||6h.1T.2x;N b=d.1d||1a.1d;N c=b+" "+a;N f=2s.2t.3J();N g=f.1w(\'6y\')!=-1&&6y.eU();N h=(f.1w(\'2W\')!=-1&&!g)&&f.68(f.1w(\'2W\')+5,3);L(h){eV.eW(\'eX\',c);3u("复制成功,请粘贴到你的2o/34上推荐给你的好友！")}14 L(eY(\'你使用的是非6z核心浏览器，请按下 6x+C 复制代码到剪贴板\',c)){3u(\'复制成功,请粘贴到你的2o/34上推荐给你的好友！\')}14{3u(\'目前只支持6z，请复制地址栏eZ,推荐给你的2o/34好友！\')}}11 4a(){N a=1a.2q(\'4E\'),1s=\'\',4F=\'\',3v=2v 5H();1f(i=0;i<a.1r;i++){N b=1u(a.4G(i).3q),4H=1u(a.4G(i).1V),6A=3w,6B=3x,1o=(3w/4H)*3x,1k=(3x/b)*3w;L(b>=6A&&4H>=6B){L((1o-1k)<=3x){1s+=4F+a.4G(i).1m;4F=\',\'}}}3v=1s.1i(\',\');N c=1u(23.f0()*3v.1r);15 3v[c]}11 49(){N a=\'\';N b=1a.2q("62");N c=b.1r;L(/2W/i.1L(2s.2t)){1f(i=0;i<c;i++){L(b[i].2g==\'2S\'){a=b[i].2T}}L(a==\'\'){1f(k 1D b){L(k==\'2S\'){a=b[k].2T}}}L(/2W 6/i.1L(2s.2t)){a=\'\'}}14{1f(k 1D b){L(/f1/i.1L(2s.2t)){L(2d(b[k].2g)!=\'1U\'){L(b[k].2g==\'2S\'){a=b[k].2T}}}14{L(k==\'2S\'){a=b[k].2T}}}}a=a.2r(/\\s/g,\'\');15 a}11 6u(a,b){N c=0;N s="";1f(N i=0;i<a.1r;i++){L(a.f2(i)>f3){c+=2}14{c++}s+=a.f4(i);L(c>=b){15 s}}15 s}11 6v(a,b){4f(\'\',b,a);15 1c}11 4f(c,d,e){N f,3y,ft,3z,2m,1o,1k,bh,2m,6C=/2W|f5 6/.1L(2s.2t);L(g=1a.2f(\'2X\')){g=1a.2f(\'2X\')}14{N g=1a.2G("18");g.13.2n="4l";g.13.6D="6E";L(6C){g.13.2n="3l";g.13.6D="6E";g.13.1N=\'f6\';N h=1a.35.2E||1a.5j.2E;g.13.1q=1u(h)+3w+\'1A\'}g.1G=\'2X\'}L(c){f=c;3y=\'在微信上关注我们\';ft=\'打开微信，点击底部的“发现”，使用 “扫一扫” 即可关注我们。\';3z=\'<4E 1m="\'+f+\'" 13="1R-1q:f7;" 1o="6F" 6G="二维码加载失败" 1k="6F" 1G="f8">\';1o=\'1o:6H;\';1k=\'1k:6H;\';bh=\'1k:f9;\';2m=\'1R: -fa 0 0 -4I;\'}14{f=1b.3A+\'?19=2c&17=\'+d+\'&1d=\'+e+\'&fb=1c\';3y=\'分享到微信朋友圈\';ft=\'打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。 <a 2x="\'+f+\'" 4r="fc">如何使用？</a>\';3z=fd=\'二维码加载中....\';1o=\'1o:6I;\';1k=\'1k:6I;\';bh=\'1k:fe;\';2m=\'1R: -4I 0 0 -4I;\'}g.1x=\'<18 1G="6J" 13="4e-fg: 2Y-4J;4e-6K: #4K;26: 2Z 4L 6L(0, 0, 0, 0.3);  26-6M: 2A 2A 2A 2A;  4J-4M: 0 fh fi 6L(0, 0, 0, 0.3); 1N: 50%; \'+2m+\'2F: 6N; 2n: 4l; 1q: 50%; \'+1o+1k+\' 2F:6N;" 1P="6J"><18 1P="6O" 1G="6O" 13="26-5r: 2Z 4L #fj; 2Y: fk 6P;"><a 13="1Y-fo:1Q;  1R-1q: fp; 6K: #fq; fr: 6Q;  2B-4N: 6R;  2B-6S: fs; fu:fv;6T-1k: 6R; 4m: 0.2; 1Y-4M: 0 2Z 0 #4K;"1P="6U" 1G="6U" 2w="6V()"4r="fw">×</a><6W 1G="fy"13=" 6T-1k: fz; 1R: 0; 2B-6S:fA; 2B-fB:"微软雅黑";">\'+3y+\'</6W></18><18 1P="6X"1G="6X"13="1Y-4O:3h;\'+bh+\'"><p 1G="6Y">\'+3z+\'</p></18><18 1P="6Z" 1G="6Z"13="26-6M: 0 0 2A 2A; 26-1q: 2Z 4L #fC; 4J-4M: 0 2Z 0 #4K fD; 1k:4w%;2Y:0 fE;2Y-1q:fF;1Y-4O: 6Q; 2B-4N:70;"><18 1G="fG"13="1Y-4O:1N;1R:0; 2Y:0;2B-4N:70;">\'+ft+\'</18>  </18></18>\';1a.35.2k(g);L(!c){4v(11(){N a=1a.2G(\'4E\');N b=1a.2f(\'6Y\');a.1m=1b.3A+\'/fH.3f?17=\'+d;a.1o=\'71\';a.1k=\'71\';a.13.fI=\'6P\';b.1x=\'\';a.6G=\'二维码加载失败...\';b.2k(a)},3b)}72=1a.2f("2X")}11 6V(){4P=1a.2f(\'2X\');1a.35.5U(4P);4P=fJ=72=fK=20}', 62, 977, '|||||||||||||||||||||||||||||||||||||||||||||||if||var||||||||||||com||function||style|else|return||url|div|webid|document|JIATHIS_CONFIGS|false|title|display|for|CKE|www|split|tmp|height|className|src|conf|width|window|top|length|pic|div1|parseInt|creElm|indexOf|innerHTML|true|shares|px|http|tl|in|likeid|span|id|encodeURIComponent|iframe|jiathis|qq|test|_lists|left|_gv|class|none|margin|uid|location|undefined|offsetHeight|match|type|text|clickpopjs|null|codehost|script|Math|head|_ckpre|border|_WR|preferred|likeurl|like|summary|weixin|typeof|block|getElementById|name|code|charset|utf|appendChild|ifsrc|mt|position|QQ|qzone|getElementsByTagName|replace|navigator|userAgent|add|new|onclick|href|css|open|6px|font|renren|jiathis_config|scrollTop|overflow|createElement|firstChild|String|pop|slice|js|parentServices|containers|data|jiathis_txt|wb|og|description|content|list|texts|msie|jiathis_weixin_share|padding|1px|custom|kaixin001|share|baidu|MSN|body|wlh|host||getS|parentNode|1000|_MR|shift|_gck|php|_CF|center|rel|jiathis_separator|met|absolute|timer|jid|tn|contains|offsetWidth|addEventListener|appkey|ralateuid|alert|picArr|300|150|wt|innerhtml|shost|jtck|servicelist|google|taobao|douban|isStrict|ie|ua|toLowerCase|_reced|scrollLeft|sTL|while|getPropertyValue|Date|getTime|path|round|1000000000|_rck|eval|_renderCounter|icon|_gw|break|_renderToolbox|hidemore|RegExp|tsina|jck|out|jiathis_counter|TWID|tsinat|jiathis_get_des|jiathis_get_pic|jialike|jtico|jtico_|background|jiathis_popup|copy|print|fav|_rec|_gd|fixed|opacity|inputTimer|clist|ckcpjs|disappear|target|timerCont|with|onloaded|setTimeout|100|clearTimeout|cloneNode|frag|attachEvent|try|catch|evt|img|con|item|imgH|200px|box|FFFFFF|solid|shadow|size|align|_oDlgEl|lhost|ckprefix|jtcbk|jtss|sns|sohu|163|youdao|my|tieba|||ifeng|shuqian|connect|msn|hi|mail|hexun|139|189|facebook|tumblr|instapaper|ly|digg|ru|delicious|substring|documentElement|max|all|_ref|getWH|getP|isGecko|getBoundingClientRect|bottom|offsetTop|offsetLeft|cssText|_uniqueConcat|push|_sc|cookie|escape|_gc|_FN|timedeff|jiathis_rdc|_sck|_otc|_custom|Array|nota|_jck|_url|onmouseout|move|onmouseover|over|continue|jiathis_counter_|object|stylesheet|link|removeChild|tools|_gp|showcount|showfaces|show_faces||no|meta|jiathis_sendto|counter|origin|_req|_grf|substr|join|postMessage|frameBorder|jiathis_style|index|auto|tagName|compareDocumentPosition|this|wh|value|rdc|fireEvent|SU|jiathis_copyUrl|jiathis_addBookmark|WT|WS|WU|AT|AS|jiathis_SetString|jiathis_sharewx|addPanel|Ctrl|opera|IE|minW|minH|isIe6|zIndex|10000000001|129|alt|300px|360px|jiathis_weixin_modal|color|rgba|radius|hidden|jiathis_modal_header|15px|right|20px|weight|line|jiathis_weixin_close|jiathis_cancel|h3|jiathis_modal_body|jiathis_webchat|jiathis_modal_footer|12px|220|_oMaskEl|webhost|_s|sc|1626433|jt_|jt_ishare|yjfx|jt_ujian|cnxh|jt_copy|fzwz|jt_fav|scj|jt_print|jt_email|yj|jt_qzone|qqkj|jt_tsina|xlwb|weibo|jt_weixin|wx|jt_tqq|txwb|jt_tsohu|shwb|jt_t163|wywb|jt_renren|rrw|jt_kaixin001|kxw|jt_googleplus|Google|googlej|plus|jt_qingbiji|qbj|jt_taobao|tjh|jt_douban|jt_xiaoyou|pyw|pengyou|jt_sdonote|mkjs|jt_baidu|bdsc|cang|jt_ydnote|ydybj|note|jt_189share|sjkc|jt_tianya|tysq|tianya|jt_feixin|space|feixin|10086|jt_tieba|bdtb|jt_tifeng|fhwb|jt_youshi|ysw|ushi|jt_fanfou|fanfou|jt_diandian|ddw|diandian|jt_mingdao|md|mingdao|jt_zsvs|zsvs|zhongsou|net|jt_qileke|qlsc|qileke|jt_google|gg|jt_buzz|Buzz|ggbuzz|jt_youdao|ydsq|jt_cqq|cqq|qqhl|jt_qq|qqsq|jt_msn|jt_pinterest|Pinterest|pinterest|jt_huaban|hbw|huaban|jt_duitang|duitang|jt_ifensi|fsw|cyworld|ifensi|jt_tyaolan|ylwb|jt_115|115|115sc|jt_hi|bdkj|apps|jt_gmail|Gmail|gmailyx|jt_hotmail|Hotmail|hotmailyx|jt_xqw|xqw|xueqi|jt_hexun|hx|bookmark|jt_toeeee|nfwb|jt_139mail|139yx|jt_189mail|189yx|jt_i139|afx|jt_iwo|WO|iwo|wfx|wo|jt_189cn|yyq|club|jt_139|ydwb|jt_tpeople|rmwb|people|jt_cnfol|zjwb|jt_txinhua|xhwb|jt_caimi|eastmoney|jt_translate|ggfy|jt_tuita|tt|tuita|jt_mop|mptk|tk|mop|jt_digu|dgw|digu|jt_xianguo|xg|jt_faxianla|fxl|jt_ganniu|gnw|ganniu|jt_miliao|ml|jt_kansohu|shssk|jt_51|51sq|home|jt_ifengkb|fhkb|jt_jcrb|flwb|jt_gmw|gmw|jt_renjian|rjw|renjian|jt_leihou|lhw|leihou|jt_thexun|hxwb|jt_dream163|yxjh|jt_masar|msw|jt_binzhi|bzw|binzhi|jt_fb|Facebook|jt_twitter||Twitter|twitter|jt_tumblr|Tumblr|jt_reddit|Reddit|reddit|jt_instapaper|Instapaper|jt_pocket|Pocket|pocket|getpocket|jt_wealink|rlw|jt_leshou|ls|site|leshou|jt_waakee|wkw|jt_cyzone|cyb|cyzone|jt_99earth|jjdq|jt_chouti|ctw|jt_dig24|dkw|dig24|jt_douban9dian|db9d|jt_meilishuo|mls|jt_mogujie|mgj|mogujie|jt_tianji|tjw|app|tianji|jt_poco|Poco|pocow|poco|jt_baohe|bhw|baohe|jt_yijee|yjw|yijee|jt_pdfonline|Pdf|pdfzxzh||jt_printfriendly|yhdy|jt_w3c|W3c|w3cyz|jt_bitly|Bit|bitly|bit|jt_digg|Digg||jt_mailru|Mail|jt_diigo|Diigo|diigo|jt_evernote|EverNote|evernote|jt_friendfeed|FriendFeed|friendfeed|jt_myspace|Myspace|myspace|jt_linkedin|LinkedIn|linkedin|jt_mixx|Mixx|mixx|jt_netlog|NetLog|netlog|jt_netvibes|Netvibes|netvibes|jt_phonefavs|Phonefavs|phonefavs|jt_pingfm|Ping|ping|jt_plaxo|||Plaxo|plaxo|jt_delicious|Delicious|jt_wong|Mister|Wong|misterwong|jt_stumbleupon|Stumbleupon|stumbleupon|jt_plurk|Plurk|plurk|jt_funp||Funp|funp|jt_myshare||||Myshare|myshare|jt_fwisp|Fwisp|fwisp||lastIndexOf|compatMode|CSS1Compat|referrer|clientHeight|clientWidth|gecko|clientTop|clientLeft|defaultView|getComputedStyle|visible|offsetParent|insertBefore|setTime|expires|toGMTString|unescape|isNaN|1000000|floor|lifetime|delete|services_custom|instanceof|shareImg|hideMore|showType|plugin|shareimg|xunlei|cnzz|||360|kankan|alimama|alibaba|1688|tmall|360buy|string||tajs||tqq|t163|tsohu|xiaoyou|bjiathis|onmousemove|hideFocus|_||nodeType||bubble|jiathis_button_expanded|jiathis_|_style||createTextNode|jiathis_button_|icons|jiathis_button_tools_||jiathis_button_icons_|min|jiathis_follow_|jiathis_like_|user|button_num|cgi|bin|qzshare|cgi_qzshare_likeurl|pageid|page|allowTransparency|scrolling|frameborder|200|number|webpage|image|setAttribute|property|decodeURIComponent|tjs|sjs|sinajs|api|javascript|repeat|attributes|nodeValue|FALSE|rsc|rnm|rfh|rfp|pre|tit|Image|gif|gi|jiathis_utility_ifr|jiathis_utility|html|firefox|filter|alpha|jiathis_share|centerpop|event|srcElement|toUpperCase|IMG|SPAN|setInterval|clearInterval|ckepop|onload|onreadystatechange|complete|loaded|readyState|ckecenterpop|static|jiathis_sharelist|input|choose|createDocumentFragment|ig|centerClose|message|onmessage|click|data_track_clickback|acn|acu|shortUrl|su|110|service|parent|sidebar|external|AddFavorite|version|clipboardData|setData|Text|prompt|URL|random|chrome|charCodeAt|128|charAt|MSIE|650px|25px|jiathis_follow_img|181px|100px|isexit|_blank|innerhtmlw|251px||clip|3px|7px|EEEEEE|9px||||decoration|2px|000000|float|bold||cursor|pointer|_self||jiathis_weixin_h3|30px|normal|family|DDDDDD|inset|10px|11px|jiathis_weixin_tip|qrcode|marginTop|_oDivEl|_oErweimaMaskEl'.split('|'), 0, {}))