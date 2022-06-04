import Main from "./screens/Main";

import GlobalStore from './Store/GlobalStore';

const App = () => {
    return(
        <GlobalStore>
            <Main />
        </GlobalStore>
    );
}

export default App;
