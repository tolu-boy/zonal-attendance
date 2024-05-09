"use client";

import { Button, Form, Input, Col, Row, DatePicker,Card } from "antd";
import React, { useState, useEffect } from "react";

interface IData {
  name: string;
  number: string;
  address: string;
}

const Users = () => {
  const [data, setData] = useState<IData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const currentDate = new Date();

  // Get the individual components of the date (year, month, day)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();

  // Format the date as desired (e.g., YYYY-MM-DD)
  const formattedDate = `${year}|${month < 10 ? '0' + month : month}|${day < 10 ? '0' + day : day}`;
  const { Search } = Input;


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        // Parse JSON response
        const jsonData = await response.json();
        console.log(jsonData, "this is the response");

        setData(jsonData);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Row>
        <Col
          xl={24}
          lg={24}
          sm={24}
          xs={24}
          className="xl:text-center py-10 px-10"
        >
          <h2 className="font-semibold xl:text-3xl xl:text-center text-xl text-center">
            Zonal Center Attendance
          </h2>
        </Col>


        <Col xl={24} className="xl:px-96 pb-10">

        <Search 
        size="large"
        placeholder="search name"
        enterButton
         loading={false} />
        
        </Col>

        

        <Col xl={24} className="xl:px-20">
          {data && (
            <div className="xl:px-96 px-10">
              {data?.map((item: IData, i: number) => (
                // <li key={i}>{item?.name}</li>
                <Card  key={i} className="mb-5 " title={`Attendance for ${formattedDate}`}>
                  <div className="flex  justify-between">
                  <p> Name: {item.name}</p>
                 <Button type="primary" size="large">Mark</Button>
                  </div>

                  <p>Address: {item.address}</p>

                  <p> Number: {item.number}</p>


               
               </Card>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Users;
