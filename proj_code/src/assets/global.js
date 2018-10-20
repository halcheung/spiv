exports.install = function (Vue, options) {

  let $toast = options.Toast;

  Vue.prototype.changeData = ()=>{
    $toast.message('global is here');
  };

  Vue.prototype.navigations = [
      {cap:'首页', ico: 'account_balance', path: 'Home', sta: 'on'},
      {cap:'投资', ico: 'monetization_on', path: 'Invest', sta: 'off'},
      {cap:'钱包', ico: 'account_balance_wallet', path: 'Wallet', sta: 'off'},
      {cap:'推广', ico: 'wifi_tethering', path: 'Share', sta: 'off'},
      {cap:'帮助', ico: 'live_help', path: 'Help', sta: 'off'},
    ];

  Vue.prototype.isMobile = (navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i));
  Vue.prototype.apiUrl = 'http://www.18ydl.com/ag/';
  Vue.prototype.USERINFO = JSON.parse(localStorage.getItem("uinf") ? localStorage.getItem("uinf").toString() : "{}");

  Vue.prototype.getCookie = (cName) => {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(cName + '=')
      if (cStart !== -1) {
        cStart = cStart + cName.length + 1
        let cEnd = document.cookie.indexOf(';', cStart)
        if (cEnd === -1) {
          cEnd = document.cookie.length
        }
        return decodeURI(document.cookie.substring(cStart, cEnd))
      }
    }
    return null
  }

  Vue.prototype.setCookie = (cName, value, expireTime, dhm) => {
    let exdate = new Date()
    if (dhm === 'd') {
      exdate.setDate(exdate.getDate() + parseInt(expireTime, 10))
    } else if (dhm === 'h') {
      exdate.setHours(exdate.getHours() + parseInt(expireTime, 10))
    } else if (dhm === 'm') {
      exdate.setMinutes(exdate.getMinutes() + parseInt(expireTime, 10))
    }
    console.log(window.location.host)
    document.cookie = cName + '=' + encodeURI(value) + ';domain=' + window.location.host.split(':')[0] + ((expireTime == null) ? '' : ';path=/;expires=' + exdate.toGMTString())
  }

  Vue.prototype.deleteCookie = (cName) => {
    let exdate = new Date()
    exdate.setDate(exdate.getDate() - parseInt(3650, 10))
    document.cookie = cName + '=' + ';domain=' + window.location.host.split(':')[0] + ';path=/;expires=' + exdate.toGMTString()
  }

};
