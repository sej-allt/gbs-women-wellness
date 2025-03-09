import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllVideos, markVideoCompleted } from "../../operations/services/video";
import { useAppDispatch } from "../../types/hooks";
import "./VideoLecturesDiv.css";

interface Video {
  _id: string;
  videoLink: string;
  tag: string;
  thumbnail: string;
  completedBy: string[]; // Array of user IDs who have completed the video
  order: number;
}

export const VideoLecturesDiv: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const dispatch = useAppDispatch()

  // Get user from Redux or localStorage (if needed)
  const user =
    useSelector((state: any) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user") || "{}");

  const loadVideos = async () => {
    try {
      const response = await dispatch(fetchAllVideos());
      if (response?.success) {
        setVideos(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleMarkCompleted = async (videoId: string) => {
    try {
      const response = await dispatch(markVideoCompleted(videoId, user._id));
      if (response?.success) {
        loadVideos();
      }
    } catch (error) {
      console.error("Error marking video completed:", error);
    }
  };

  // Group videos by tag
  const groupedVideos = videos.reduce((acc: { [key: string]: Video[] }, video) => {
    if (!acc[video.tag]) {
      acc[video.tag] = [];
    }
    acc[video.tag].push(video);
    return acc;
  }, {});

  return (
    <div className="video-container">
      <h3>Video Lectures</h3>
      {Object.keys(groupedVideos).map((tag) => (
        <div key={tag} className="video-group">
          <h4 className="video-tag">{tag}</h4>
          <div className="video-list">
            {groupedVideos[tag].map((video) => {
              const isCompleted = video.completedBy.includes(user._id);
              return (
                <div key={video._id} className="video-card">
                  <div className="video-iframe-container">
                    <Link to = {video.videoLink} ><img
                      src={video.thumbnail}
                      title={tag}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></img>
                    </Link>
                  </div>
                  <div className="video-actions">
                    {isCompleted ? (
                      <FaCheckCircle className="completed-icon" title="Completed" />
                    ) : (
                      <button
                        onClick={() => handleMarkCompleted(video._id)}
                        className="mark-completed-btn"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

