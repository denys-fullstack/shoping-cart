import { deleteCart, updateCart } from 'action/productlist.action';
import React, { ReactNode, useEffect } from 'react';

import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItem?: CardProps[];
    setCartItem?: Dispatch<SetStateAction<CardProps[]>>;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, cartItem, setCartItem, children }: ModalProps) => {
    //   if (!isOpen) return null;

    const [changeState, setChangeState] = React.useState(false);
    const [totalCount, setTotalCount] = React.useState(0);

    function handleCheckOut() {
        if (cartItem) {
            setCartItem?.([]);
            setTotalCount(0);
            onClose();
        }
    }

    const handlePlusProduct = (product: CardProps) => {
        cartItem?.forEach((item: CardProps, index: number) => {
            if (item?.id === product.id) {
                cartItem[index].count++;
                updateCart(product.id, cartItem[index].count);
                setCartItem?.(cartItem);
                setChangeState(!changeState);
                return;
            }
        })
    }

    const handleRemoveProduct = (product: CardProps) => {
        cartItem?.forEach((item: CardProps, index: number) => {
            if (item?.id === product.id) {
                cartItem[index].count === 0 ? 0 : cartItem[index].count--;
                updateCart(product.id, cartItem[index].count);
                setCartItem?.(cartItem);
                setChangeState(!changeState);
                return;
            }
        })
    }

    const handleDeleteProduct = (product: CardProps) => {
        cartItem?.forEach((item: CardProps, index: number) => {
            if (item?.id === product.id) {
                const newItems = [...cartItem];
                newItems.splice(index, 1);
                deleteCart(product.id);
                setCartItem?.(newItems);
                setChangeState(!changeState);
                return;
            }
        })
    }

    useEffect(() => {
        let temp = 0;
        cartItem?.map((item: CardProps) => {
            temp += item.count * item.price;
        })
        setTotalCount(temp);
    }, [changeState, isOpen])


    return (
        isOpen && <div className="fixed z-10 inset-0 overflow-y-auto">
            <div style={{ opacity: '100%' }} className="bg-gray opacity-25 flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    onClick={onClose}
                >
                </div>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white py-3 px-4 sm:px-6">
                        <div className="mt-2">
                            <div className="flex font-sans">
                                <form className="flex-auto p-6">
                                    {cartItem?.map((product, index) => (
                                        <div key={index}>
                                            <div className="row col-12 mb-5">
                                                <div className="flex flex-row space-x-4 py-4">
                                                    <div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-white">
                                                        <img src={product.image} alt="" className="w-20 h-20 object-cover" loading="lazy" />
                                                    </div>
                                                    <div className="flex flex-1 flex-col text-center p-2 justify-center">
                                                        <span className="font-semibold">{product.title}</span>
                                                    </div>
                                                    <p className="flex flex-col justify-center space-y-2 text-sm p-2" ><b> {`$${(product.price * product.count).toLocaleString()} USD`} </b></p>
                                                </div>
                                            </div>
                                            <div className="flex h-9 flex-row">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteProduct(product)}
                                                    className="ease flex min-w-[36px] max-w-[36px] items-center justify-center border px-2 transition-all duration-200 hover:border-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" className="hover:text-accent-3 mx-[1px] h-4 w-4"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
                                                </button>
                                                <p className="ml-2 flex w-full items-center justify-center border dark:border-gray-700">
                                                    <span className="w-full px-2"> {product.count} </span>
                                                </p>
                                                <button
                                                    type="button"
                                                    className="ease flex min-w-[36px] max-w-[36px] items-center justify-center border px-2 transition-all duration-200 hover:border-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900 ml-auto"
                                                    onClick={() => handleRemoveProduct(product)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" className="h-4 w-4"><path d="M5 12H19"></path></svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handlePlusProduct(product)}
                                                    className="ease flex min-w-[36px] max-w-[36px] items-center justify-center border px-2 transition-all duration-200 hover:border-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" shapeRendering="geometricPrecision" className="h-4 w-4"><path d="M12 5V19"></path><path d="M5 12H19"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-5 pt-5 flex items-center justify-between">
                                        <p>total</p>
                                        <p className="text-right" style={{ fontSize: '24px' }} >{`$${totalCount.toLocaleString()} USD`}</p>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    <div className="bg-gray-50 py-3 px-4 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleCheckOut}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
