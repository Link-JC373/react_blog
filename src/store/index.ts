import { createStore } from 'redux';
import rootReducer  from './reducers';

// 安装redux-devtools-extension的可视化工具。需去谷歌商店安装Redux-DevTools
import { composeWithDevTools } from 'redux-devtools-extension';

// const StoreConfig=() => {
//     return createStore(
//         rootReducer,
//         composeWithDevTools()
//     );
// }
const store = createStore(rootReducer, composeWithDevTools());
export default store;
