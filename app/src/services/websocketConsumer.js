import store from './store';

class WebsocketConsumer {
  constructor() {
    this.func_map = {};
    this.connect();
  }

  connect() {
    const url = this.get_url();
    this.websocket = new WebSocket(url);
    this.websocket.onmessage = this.handle_message.bind(this);
    this.websocket.onclose = function (e) {
      console.log(
        "User socket closed unexpectedly. Attempting reconnect in 1 second. Event: ",
        e
      );
      setTimeout(this.connect.bind(this), 1000);
    }.bind(this);
  }

  disconnect() {
    if(this.websocket) {
      this.websocket.close();
    }
  }

  get_url() {
    const prefix = location.protocol === "https" ? "wss" : "ws";
    if(process.env.VUE_APP_MODE === 'production') {
      return 'wss://www.watchadoing.net:8000/ws/pipe/';
    }
    let host = window.location.host;
    host = host.substring(0, host.indexOf(":"));
    return prefix + "://" + host + ":8000/ws/pipe/";
  }

  handle_message(payload) {
    if(store.getters.appState === null) {
        return;
    }
    const data = JSON.parse(payload.data);
    console.log("Received websocket payload:");
    console.log(data);
    const target = `${data.category}:${data.action}`;
    if(!this.func_map[target]) {
      console.log('No function registered');
      return;
    }
    this.func_map[target](data.data);
  }

  register(target, callback) {
    this.func_map[target] = callback;
  }
}

export default new WebsocketConsumer();