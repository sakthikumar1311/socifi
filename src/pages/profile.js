import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useWeb3 } from '../hooks/useWeb3';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { account, isConnected, connect, disconnect } = useWeb3();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch full profile data
      fetch(`/api/users/${user.id}/profile`)
        .then(res => res.json())
        .then(setProfile)
        .catch(console.error);
    }
  }, [user]);

  const handleWeb3Connect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect Web3:', error);
    }
  };

  if (!user) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img 
          src={profile?.avatar || '/default-avatar.png'} 
          alt="Profile" 
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1>{profile?.displayName || user.username}</h1>
          <p>{profile?.bio}</p>
        </div>
      </div>

      <div className="profile-sections">
        <section className="web3-section">
          <h2>Web3 Connection</h2>
          {isConnected ? (
            <div>
              <p>Connected: {account}</p>
              <button onClick={disconnect}>Disconnect Wallet</button>
            </div>
          ) : (
            <button onClick={handleWeb3Connect}>Connect Wallet</button>
          )}
        </section>

        <section className="stats-section">
          <h2>Statistics</h2>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-value">{profile?.videosWatched || 0}</span>
              <span className="stat-label">Videos Watched</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile?.totalLikes || 0}</span>
              <span className="stat-label">Likes Given</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile?.messagessent || 0}</span>
              <span className="stat-label">Messages Sent</span>
            </div>
          </div>
        </section>
      </div>

      <div className="profile-actions">
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;