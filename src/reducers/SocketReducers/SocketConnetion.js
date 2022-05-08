import Immutable from "seamless-immutable";
import * as types from "../../actions/ActionTypes";

const initialState = Immutable({
  isSocketConnected: false
});

export default function networkInfo(state = initialState, action) {
  switch (action.type) {
    case types.SOCKET_INFO:
      return Immutable.merge(state, {
        isSocketConnected: action.isSocketConnected
      });
    default:
      return state;
  }
}
