"use client";
import { Button, Form, Input, Col, Row, DatePicker } from "antd";
import type { FormProps } from "antd";
import React, { useState } from 'react';

type FieldType = {
  name?: string;
  number?: string;
  address?: string;
  DOB?: string;
};

export default function Home() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    console.log("Success:", values.name);
    const username = values.name
    const usernumber = values.number
    const userAddress = values.number

    try {
      // Make POST request to the API endpoint
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: username, number:usernumber, address:userAddress})
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error submitting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const inputStyle = {
    padding: "3% 3% 0 0",
    // Add other styles as needed
  };

  return (
    <div className="">
      <Row>
        <Col
          xl={24}
          lg={24}
          sm={24}
          xs={24}
          className="xl:text-center py-10 px-10"
        >
          <h2 className="font-semibold xl:text-3xl xl:text-center text-xl text-center">
            Join Attendance
          </h2>
        </Col>
        <Col xl={24} className="xl:px-96  px-10">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={16}>
              <Col xl={24} lg={24} sm={24} xs={24}>
                <Form.Item<FieldType>
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input size="large" style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} sm={24} xs={24}>
                <Form.Item<FieldType>
                  label="Number"
                  name="number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input size="large" style={inputStyle} />
                </Form.Item>
              </Col>

              <Col xl={24} lg={24} sm={24} xs={24}>
                <Form.Item<FieldType>
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input.TextArea size="large" rows={6} />
                </Form.Item>
              </Col>

              <Col xl={10} lg={12} sm={16} xs={16}>
                <Form.Item>
                  <Button type="primary" size="large" block htmlType="submit"
                  loading={loading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
