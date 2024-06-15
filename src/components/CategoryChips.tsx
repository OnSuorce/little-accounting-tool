
import React from 'react';
import { Chip } from 'primereact/chip';

interface CategoryChipsProps {
    categories: Category[];
}

const CategoryChips: React.FC<CategoryChipsProps> = ({ categories }) => {
    return (
        <div className="p-d-flex p-flex-wrap">
            {categories.map((category, index) => (
                <Chip
                    key={index}
                    label={category.label}
                    icon={category.icon}
                    className="p-mr-2 p-mb-2"
                    style={{ backgroundColor: category.color, color: '#fff' }}
                />
            ))}
        </div>
    );
};

export default CategoryChips;
