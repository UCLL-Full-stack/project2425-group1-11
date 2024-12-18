import React, { useState } from 'react';
import Modal from '@components/ui/Modal';

interface PinCardProps {
    id: number;
    title: string;
    imageUrl: string;
    description?: string;
    categories?: { id: number; name: string }[];
}

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const PinCard: React.FC<PinCardProps> = ({ id, title, imageUrl, description, categories }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const displayedCategories = categories?.slice(0, 2);
    const extraCategoriesCount = categories && categories.length > 2 ? categories.length - 2 : 0;

    return (
        <>
            <div
                className="rounded-lg overflow-hidden shadow-xl cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => setModalOpen(true)}
            >
                <img src={imageUrl} alt={title} className="w-full h-[192px] object-cover" />
                <div className="p-3 bg-white">
                    <h3 className="text-sm font-semibold text-gray-800">
                        {truncateText(title, 25)}
                    </h3>
                    {description && (
                        <p className="text-gray-600 text-xs mt-1">
                            {truncateText(description, 40)}
                        </p>
                    )}
                    {categories && categories.length > 0 && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-500">Categories:</p>
                            <ul className="flex flex-wrap gap-1 mt-1">
                                {displayedCategories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                                    >
                                        {category.name}
                                    </li>
                                ))}
                                {extraCategoriesCount > 0 && (
                                    <li className="text-xs bg-gray-300 text-gray-800 px-2 py-1 rounded">
                                        +{extraCategoriesCount}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-64 object-cover rounded mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 mb-4">
                        {description || 'No description available.'}
                    </p>
                    {categories && categories.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold mb-2">Categories:</h4>
                            <ul className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded"
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button
                        className="bg-red-600 text-white py-2 px-4 mt-6 rounded hover:bg-red-700"
                        onClick={() => alert(`Added Pin ${id} to a Board`)}
                    >
                        Add to Board
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default PinCard;
