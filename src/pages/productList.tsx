import React, { useEffect } from 'react';
import '../app/globals.css'
import Modal from 'components/modal';
import { addCart, deleteCart, getProducts } from 'action/productlist.action';

export default function ProductList() {

    const [products, setProducts] = React.useState<CardProps[]>([]);

    const [cloneproducts, setCloneProducts] = React.useState<CardProps[]>([]);
    const [selectState, setSelectState] = React.useState<boolean[]>(Array(products.length).fill(false));

    const [cartItem, setCartItem] = React.useState<CardProps[]>([]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => { setIsModalOpen(true); }
    const handleCloseModal = () => { setCartItem([]); setSelectState(Array(products.length).fill(false)); setIsModalOpen(false); }

    useEffect( () => {
        const fetchProducts = async () => {
            const response = await getProducts();
            if (response !== undefined) {
                setProducts(response.data || []);
                setCloneProducts(response.data || []);
            }       
        }
        fetchProducts();
    }, []);

    function addToCart(product: CardProps, index: number) {
        let temp = { ...product };
        temp.count = 1;
        temp.id = product._id

        if (selectState[index] === false) {            
            addCart(temp);
            setCartItem([...cartItem, temp]);
        } else {
            cartItem?.forEach((item: CardProps, idx: number) => {
                if (item?.id === product._id) {
                    const newItems = [...cartItem];
                    newItems.splice(idx, 1);
                    deleteCart(product._id)
                    setCartItem?.(newItems);
                    return;
                }
            })
        }

        selectState[index] = !selectState[index];
        setSelectState(selectState);
    }

    function handleSearchChange(e: any) {
        setProducts(cloneproducts?.filter((x) => (x?.title?.toLowerCase() || '').includes(e.target.value.toLowerCase())));
    }

    return (
        <>
            <section>
                <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-slate-900">ProductsList</h2>
                        <div className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                            <span className="relative" onClick={handleOpenModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" className="h-6 transition-all ease-in-out hover:scale-110 hover:text-gray-500 dark:hover:text-gray-300"><path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"></path><path d="M1 5H19"></path><path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"></path></svg>
                                <div className="absolute bottom-0 left-0 -mb-3 -ml-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-xs text-white dark:border-black dark:bg-white dark:text-black">
                                    {cartItem ? (Array.isArray(cartItem) ? cartItem.length : cartItem) : 0}
                                </div>
                            </span>
                            <Modal isOpen={isModalOpen} onClose={handleCloseModal} cartItem={cartItem} setCartItem={setCartItem}>
                                <p>Modal Content Here</p>
                            </Modal>
                        </div>
                    </div>
                    <form className="group relative">
                        <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                        <input onChange={(e) => handleSearchChange(e)} className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..." />
                    </form>
                </header>
                <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 grid-cols-1 gap-4 text-sm leading-6">
                    {products?.map((product, index) => (
                        <li className="flex" key={product.id}>
                            <div className={`hover:bg-green hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3 ${selectState[index] ? 'bg-blue' : ''}`}>
                                <dl className="p-1 grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                                    <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-0 xl:mt-4">
                                        <dt className="sr-only">Users</dt>
                                        {
                                            product.image && <img
                                                src={product.image}
                                                alt=""
                                                className="w-60 h-60 object-cover"
                                                loading="lazy"
                                            />
                                        }
                                    </div>
                                    <div className="w-100" />
                                    <div className="mt-2">
                                        <dt className="sr-only">Title</dt>
                                        <dd className="font-semibold text-slate-900 text-center">
                                            {product.title && product.title}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="sr-only">Price</dt>
                                        <dd className="text-center">{`$${product.price ? product.price : 0} USD`}</dd>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            className="btn m-1 p-2 bg-gray hover:bg-yellow py-2 px-4 rounded-full"
                                            onClick={() => { addToCart(product, index) }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </dl>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}