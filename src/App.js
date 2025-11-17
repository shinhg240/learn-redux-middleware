import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import CounterContainer from './containers/CounterContainer';

function App() {
  return (
      <Routes>
        <Route path="/" element={<CounterContainer />} />
        {/* <Route path="/" element={<PostListPage />} /> */}
        {/* <Route path="/:id" element={<PostPage />} /> */}
      </Routes>
  );
}

export default App;