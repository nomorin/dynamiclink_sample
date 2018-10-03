const DYNAMIC_LINK = {
  'URL'       : 'https://raccoonwallet.page.link/?link=',
  'BASE_URL'  : 'https://raccoonwallet.com/payment?',
  'APN'       : '&apn=wacode.yamada.yuki.nempaymentapp',
  'DELIMITER' : '&',
  'PARAMETER' : '='
}

/**
* 入力値から各リンクを生成します.
*/
function createLinks() {
  var addr   = document.getElementById('addr').value;
  var amount = document.getElementById('amount').value * 1000000;
  var msg    = document.getElementById('msg').value;
  var name   = document.getElementById('name').value;

  var dynamic_link = createDinamicLink(addr, amount, msg, name);
  var nomal_link = createBasicLink(addr, amount, msg, "");

  document.getElementById('dynamic').value = dynamic_link;
  document.getElementById('nomal').value = nomal_link;
}


/**
* 条件分岐ありのリンクを作成します.
*/
function createDinamicLink(addr, amount, msg, name){

  var base_url = createBasicLink(addr, amount, msg, name);
  var encoded_url = encodeURIComponent(base_url);

  var deep_link_url = DYNAMIC_LINK.URL
                      + encoded_url
                      + DYNAMIC_LINK.APN;

  return(deep_link_url);
}

/**
* ベースとなるリンクを作成します.
*/
function createBasicLink(addr, amount, msg, name){

  var base_url = DYNAMIC_LINK.BASE_URL
            + 'addr'    + DYNAMIC_LINK.PARAMETER + addr    + DYNAMIC_LINK.DELIMITER
            + 'amount'  + DYNAMIC_LINK.PARAMETER + amount  + DYNAMIC_LINK.DELIMITER
            + 'msg'     + DYNAMIC_LINK.PARAMETER + msg;

  if(name) {
    base_url += DYNAMIC_LINK.DELIMITER
            + 'name'    + DYNAMIC_LINK.PARAMETER + name;
  }

  return(base_url);
}

/**
* クリップボードにコピー.
*/
function copyClipbord(ids) {
  var copyTarget = document.getElementById(ids);

  copyTarget.select();
  document.execCommand("Copy");
}
