import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { WrapperMyOrderPage } from "./styles";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const fetchOrderDetail = async () => {
    const res = await OrderService.getOrderDetail(user?.id, user?.access_token);
    return res.data;
  };
  const queryOrder = useQuery(
    {
      queryKey: ["order"],
      queryFn: fetchOrderDetail,
    },
    {
      enabled: user?.id && user?.access_token,
    }
  );
  const { isLoading, data } = queryOrder;
  console.log("data: ", data);
  return (
    <div style={{ backgroundColor: "#f5f5fa" }}>
      <WrapperMyOrderPage>MyOrderPage</WrapperMyOrderPage>
    </div>
  );
};

export default MyOrderPage;
