import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, query, ref, push } from 'firebase/database';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { app } from '../config/firebaseConfig';
import { addComment } from '../services/addComment';

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

 const onSubmit = (data) => {
  addComment({...data, nft: item.id, user: user.uid });
  setValue("message", "");
 }

 useEffect(() => {
  if (item?.id) {
    const database = getDatabase(app);
    const results = query(ref(database, `comment/${item?.id || ''}`))
    onValue(results, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        setCommentsList(data);
    });
  }
}, [item]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Display NFT"
      >
        <div className="flex relative gap-4">
          <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0">x</button>
          <div className="flex flex-col items-center justify-center border rounded-md">
              <h2 className="text-2xl font-bold mb-4 text-center">{item?.title || ''}</h2>

              <img src={item?.image || "https://returntofreedom.org/store/wp-content/uploads/default-placeholder.png"} id="image" alt="nft" width="300" />
              <div className="flex flex-col items-start w-full p-3">
                <p><span className="font-bold">Title: </span>{item?.description || ''}</p>
                <p><span className="font-bold">Price: </span>$ {item?.price || 0}</p>
              </div>
          </div>
          <div className="flex flex-col justify-between pt-10 w-96">
            <div className="flex flex-col">
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
            <div className="flex gap-2">
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