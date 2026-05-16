import React, { useState } from "react";

const Collection = () => {

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");

  return (

    <div className="p-10">

      <h1 className="text-3xl mb-10">
        ALL COLLECTIONS
      </h1>

      {/* CATEGORY */}

      <div className="mb-5">

        <h2 className="font-bold mb-2">
          CATEGORY
        </h2>

        <select
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border p-2"
        >

          <option value="">
            Select Category
          </option>

          <option value="Men">
            Men
          </option>

          <option value="Women">
            Women
          </option>

          <option value="Kids">
            Kids
          </option>

        </select>

      </div>

      {/* TYPE */}

      <div className="mb-5">

        <h2 className="font-bold mb-2">
          TYPE
        </h2>

        <select
          onChange={(e) =>
            setType(e.target.value)
          }
          className="border p-2"
        >

          <option value="">
            Select Type
          </option>

          <option value="Topwear">
            Topwear
          </option>

          <option value="Bottomwear">
            Bottomwear
          </option>

          <option value="Winterwear">
            Winterwear
          </option>

        </select>

      </div>

      {/* SORT */}

      <div className="mb-5">

        <h2 className="font-bold mb-2">
          SORT
        </h2>

        <select
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="border p-2"
        >

          <option value="">
            Sort By
          </option>

          <option value="Low To High">
            Low To High
          </option>

          <option value="High To Low">
            High To Low
          </option>

        </select>

      </div>

      {/* OUTPUT */}

      <div className="mt-10">

        <p>
          Selected Category:
          {category}
        </p>

        <p>
          Selected Type:
          {type}
        </p>

        <p>
          Sort:
          {sort}
        </p>

      </div>

    </div>
  );
};

export default Collection;