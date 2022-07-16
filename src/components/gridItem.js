function GridItem({item, itemId, onClick = () => {}}) {

    return (
        <button className="w-full border rounded-md flex hover:bg-gray-200 transition-all ease-in-out duration-500" onClick={onClick}>
            <div className="h-full flex-1 bg-gray-100">
                <img src="https://returntofreedom.org/store/wp-content/uploads/default-placeholder.png" id={itemId} alt="image" />
            </div>
            <div className="flex-1 p-5 relative h-full">
                <h1 className="text-lg font-bold mb-8">{item.title}</h1>
                <p className="text-sm text-left">{item.description}</p>
                <p className="text-md font-bold absolute bottom-5 right-5">$ {item.price}</p>
            </div>
        </button>
    )
}

export default GridItem;