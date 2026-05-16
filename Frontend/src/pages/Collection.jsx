import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products } = useContext(ShopContext)

  const location = useLocation()
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }

  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {

      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;

    }

  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  useEffect(() => {
    setFilterProducts(products);
  }, [products])

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    if (query.get('openFilter') === 'true') {
      setShowFilter(true)
      window.scrollTo(0, 0)
    }
  }, [location.search])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>

        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />
              Men
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />
              Women
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />
              Kids
            </p>

          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />
              Topwear
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />
              Bottomwear
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />
              Winterwear
            </p>

          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>

        </div>

        <div className='flex flex-wrap gap-2 mb-6'>
          {['Men', 'Women', 'Kids'].map((item) => (
            <button
              key={item}
              onClick={() => toggleCategory({ target: { value: item } })}
              className={`px-4 py-2 rounded-full text-sm border transition ${category.includes(item) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}>
              {item}
            </button>
          ))}
          {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
            <button
              key={item}
              onClick={() => toggleSubCategory({ target: { value: item } })}
              className={`px-4 py-2 rounded-full text-sm border transition ${subCategory.includes(item) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}>
              {item}
            </button>
          ))}
          <button
            onClick={() => { setCategory([]); setSubCategory([]); setSortType('relevant') }}
            className='px-4 py-2 rounded-full text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition'
          >
            Clear filters
          </button>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length === 0 ? (
            <div className='col-span-full py-10 text-center text-gray-500'>
              No clothes found. Please select a category or try again.
            </div>
          ) : (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>

      </div>

    </div>
  )
}

export default Collection