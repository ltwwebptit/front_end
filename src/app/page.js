import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

export default function Home() {
  return (
    <div className="app-container">
      <Sidebar />
      <ChatArea />
    </div>
  );
}
