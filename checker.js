var portscanner = require('portscanner');
var checkIp = require('check-ip');

function check() {
  const ip = document.getElementById('ip');
  const port = document.getElementById('port');
  const success = document.getElementById('success');
  const failure = document.getElementById('failure');
  const error = document.getElementById('error');
  success.style.display = 'none';
  failure.style.display = 'none';
  error.style.display = 'none';
  //check if empty
  if ( ip === null || port === null || ip.value === '' || port.value === '') {
    error.innerHTML = 'Specify an IP and a port number first!'
    error.style.display = 'block';
  } else {
    //port validation
    if (!Number.isInteger(Number.parseInt(port.value))) {
      error.innerHTML = 'Error! Port must be integer!'
      error.style.display = 'block';
    } else if (port.value < 0 || port.value > 65535) {
      error.innerHTML = 'Error! Port Number Out of range!'
      error.style.display = 'block';
    } else {
      //check ip
      var response = checkIp(ip.value);
      if (!response.isValid & ip.value !== 'localhost') {
        error.innerHTML = 'Error! Invalid IP'
        error.style.display = 'block';
      } else {
        //check port
        portscanner.checkPortStatus(port.value, ip.value).then(status => {
          // Status is 'open' if currently in use or 'closed' if available
          if (status === 'open') {
            success.style.display = 'block';
          } else {
            failure.style.display = 'block';
          }
        });
      }
    }
  }
}

function prevent(event) {
  event = event || window.event;
  event.preventDefault();
  check();
}