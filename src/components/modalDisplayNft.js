import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, query, ref } from 'firebase/database';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { app } from '../config/firebaseConfig';
import { addComment } from '../services/addComment';
import { addFavorite, removeFavorite } from '../services/favorite';
import favoriteUp from '../assets/favorite-up.png';
import favoriteDown from '../assets/favorite-down.png';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function ModalDisplayNft(props) {
 const { isOpen, setIsOpen, item, setItem, user } = props;
 const { register, handleSubmit, setValue } = useForm();
 const [commentsList, setCommentsList] = useState({});
 const [favorite, setFavorite] = useState(false);
 const [starId, setStarId] = useState('');
 const [starsCount, setStarsCount] = useState(0);
 const database = getDatabase(app);

 const onSubmit = (data) => {
  addComment({...data, nft: item.id, user: user.uid });
  setValue("message", "");
 }

 useEffect(() => {
  if (item?.id) {
    const results = query(ref(database, `comment/${item?.id || ''}`))
    const starResults = query(ref(database, `star/${item?.id || ''}`))
    onValue(results, (snapshot) => {
        const data = snapshot.val();
        setCommentsList(data);
    });
    onValue(starResults, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const keys = Object.keys(data);
        setStarsCount(keys.length);
        const users = keys.flatMap((key) => data[key].user);
        setFavorite(users.includes(user.uid));
      } else {
        setStarsCount(0)
        setFavorite(false)
      }     
    })
  }
}, [item, user.uid, database]);

const toggleFavorite = () => {
  if (!favorite) {
    const id = addFavorite(item.id, user.uid);
    setStarId(id);
    setFavorite(true);
  } else {
    removeFavorite(item.id, user.uid)
    setFavorite(false);
  }
}

useEffect(() => {
  console.log(favorite);
}, [favorite])

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Display NFT"
      >
        <div className="relative">
          <div className="flex relative gap-4">
            <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0">x</button>
            <div className="flex flex-col items-center justify-center border rounded-md mb-20">
                <h2 className="text-2xl font-bold my-4 text-center">{item?.title || ''}</h2>

                <img src={item?.image || "https://returntofreedom.org/store/wp-content/uploads/default-placeholder.png"} id="image" alt="nft" width="300" />
                <div className="flex flex-col items-start w-full p-3">
                  <p><span className="font-bold">Price: </span>$ {item?.price || 0}</p>
                </div>
            </div>
            <div className="flex flex-col justify-between w-96">
              <div className="flex flex-col">
                <span className="text-small text-gray-500">Description</span>
                <p className="pt-2 break-words h-16 overflow-y-auto">{item?.description || ''}</p>
                <hr />
                <div className="pt-4 h-4/6 overflow-y-auto">
                  {commentsList && Object.keys(commentsList).length > 0 ? (
                    Object.keys(commentsList).map((key) => (
                      Object.keys(commentsList[key]).length > 0 && (
                        Object.keys(commentsList[key]).map((item) => (
                          <div key={item} className="flex flex-col">
                            <p><span className="font-medium">{user.displayName}:</span> {commentsList[key][item].message}</p>
                            <p className="text-[10px] text-gray-500">{new Date(commentsList[key][item].date).toLocaleDateString('en-US', { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</p>
                          </div>
                        ))
                      )
                    ))
                  ) : (
                    <p className="text-gray-500">No comments so far</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-8 absolute left-0 bottom-0 gap-4 items-center w-full">
            <button onClick={toggleFavorite}>
              <img src={favorite ? favoriteUp : favoriteDown} alt="favorite" height="30" width="30" />
            </button>
            {starsCount > 0 && (<p>{starsCount} star{starsCount > 1 && 's'}</p>)}
            <div className="flex flex-1">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-2">
                <input type="hidden" {...register("hiddenId")} />
                <input type="text" placeholder="Write your comment here" className="border p-3 rounded-md flex-1" {...register("message")} />
                <button type="submit" className="border p-3 hover:bg-gray-200 hover:border-black rounded-md">Send</button>
              </form>
            </div>      
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDisplayNft;