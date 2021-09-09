import Jweet from "components/Jweet";

import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import JweetFactory from "components/jweetFactory";

const Home = ({ userObj }) => {
  const [jweets, setJweets] = useState([]);

  useEffect(() => {
    dbService.collection("jweets").onSnapshot((snapshot) => {
      const jweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJweets(jweetArray);
    });
  }, []);

  return (
    <div className="container">
      <JweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {jweets.map((jweet) => (
          <Jweet
            key={jweet.id}
            jweetObj={jweet}
            isOwner={jweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
