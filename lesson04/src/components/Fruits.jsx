import { useEffect, useState } from "react";
import { api } from "../api";
import { Card } from "antd";
import { Image } from 'antd';
const { Meta } = Card;

const Fruits = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get("/fruits").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      <h2>Fruits</h2>
      <div className="container mx-auto flex gap-6">
        {data?.map((item) => (
          <Card
            hoverable
            key={item.id}
            className="w-[240px]"
            cover={
              <Image
                style={{height:180}}
                className="h-[180px] object-contain w-full"
                src={item.image}
              />
            }
          >
            <Meta title={item.name} description="www.instagram.com" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Fruits;
