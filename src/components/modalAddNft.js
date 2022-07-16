import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { createNFT } from '../services/createNFT';

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

function ModalAddNft(props) {
 const { isOpen, setIsOpen, user } = props;
 const { register, handleSubmit, setValue } = useForm();

 const onSubmit = (data) => {
    const result = createNFT({ ...data, user });
    if (result) {
        alert("NFT successfully created");
        setValue("title", "");
        setValue("description", "");
        setValue("price", 0);
        setIsOpen(false);
    } else {
        alert("An error has occurred. Please try again later")
    }
 }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-2xl font-bold mb-4">Add new NFT</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input type="hidden" {...register("hiddenId")} />
            <div className="flex flex-col">
                <label htmlFor="image">Picture</label>
                <input type="file" {...register("image")} />
            </div>
            <div className="flex flex-col">
                <label htmlFor="title">Title</label>
                <input className="border p-3 rounded-md" type="text" {...register("title")} />
            </div>
            <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <input className="border p-3 rounded-md" type="text" {...register("description")} />
            </div>
            <div className="flex flex-col">
                <label htmlFor="price">Price</label>
                <input className="border p-3 rounded-md" type="number" step=".01" {...register("price")} />
            </div>
            <button type="submit" className="border p-3 hover:bg-gray-200 hover:border-black rounded-md">Save</button>
        </form>
      </Modal>
    </div>
  );
}

export default ModalAddNft;