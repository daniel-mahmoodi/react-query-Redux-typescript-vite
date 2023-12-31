import { FunctionComponent, useState } from "react";
import { ListOfItemsParams, ProductItemType } from "../repo/models";
import useListOfItemsPaginated from "../Hook/useListOfItemsPaginated";
import ProductItem from "./Products/ProductItem";

interface ListOfItemsProps {}

const ListOfItems: FunctionComponent<ListOfItemsProps> = () => {
  const [pageParams, setPageParams] = useState<ListOfItemsParams>({
    pageNumber: 1,
    rowCount: 10,
  });
  const { data, isPending, totalItem } = useListOfItemsPaginated(pageParams);
  if (isPending) {
    return <div>Loading............</div>;
  }
  if (data) {
    return (
      <>
        <div>totalItems:{totalItem}</div>
        <div className="flex overflow-hidden ">
          {data.map((item: ProductItemType) => (
            <ProductItem key={item.id} data={item} />
          ))}
        </div>
        <span
          className="bg-gray-400 m-2"
          onClick={() =>
            setPageParams({
              pageNumber: pageParams.pageNumber + 1,
              rowCount: pageParams.rowCount,
            })
          }
        >
          Next Page
        </span>
        <span
          className="bg-gray-400"
          onClick={() =>
            setPageParams({
              pageNumber: pageParams.pageNumber - 1,
              rowCount: pageParams.rowCount,
            })
          }
        >
          Prev Page
        </span>
      </>
    );
  }
  return <div>no data</div>;
};

export default ListOfItems;
