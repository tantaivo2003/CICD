// src/pages/TopicDetailPage.tsx
import { useParams } from "react-router-dom";

const TopicDetailPage = () => {
  const { topicId } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Topic Detail</h1>
      <p>Hiển thị danh sách từ vựng thuộc chủ đề ID: {topicId}</p>
    </div>
  );
};

export default TopicDetailPage;
