function AddNewItemBtn(props) {
    const { onClick } = props;
    return (
        <button 
            className="border rounded-md flex justify-center items-center py-10 hover:bg-gray-200 transition-all ease-in-out duration-500" 
            onClick={onClick}
        >
            <p className="text-3xl font-bold">Add new Item</p>
        </button>
    )
}

export default AddNewItemBtn;