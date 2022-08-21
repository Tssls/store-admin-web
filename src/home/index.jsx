import React, { useEffect, useMemo, useState, useContext, useCallback } from 'react';
import { Table, Button, message, Popconfirm, Form, Input, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { xhrStoreQuery, xhrDeleteStore } from '../xhr';
import { ThemeContext } from '../store';
import './index.css';

const { Option } = Select;

const Home = () => {
  const history = useHistory();
  const { dispatch } = useContext(ThemeContext);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totals, setTotal] = useState(0);
  const [formData, setFormData] = useState({});

  const pages = useMemo(() => {return (page - 1) * 10}, [page]);

  const getStoreList = useCallback(() => {
    xhrStoreQuery({...formData,...{ page: pages, pageSize }}).then(res => {
      if (res.status === 401) {
        history.push('/login');
      } else if (res.status === 200) {
        setList(res.data);
        setTotal(res.total);
      }
    }).catch(err => {
      message.error(err.message);
    })
  }, [pages, pageSize, history, formData]);

  const editClick = useCallback((record) => {
    dispatch({
      type: 'set_temp',
      payload: record
    });
    history.push('/create?type=edit')
  }, [history, dispatch]);

  const deleteStore = useCallback((record) => {
    xhrDeleteStore({ id: record.id }).then(res => {
      if (res.status === 200) {
        message.success(res.message);
        getStoreList();
      } else {
        message.error(res.message);
      }
    }).catch(err => {
      message.error(err.message);
    })
  }, [getStoreList]);

  const columns = useMemo(() => (
    [
      {
        title: '店名',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <span>{text}</span>,
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '所在城市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '电话号码',
        key: 'ipone',
        dataIndex: 'ipone',
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <div size="middle">
            <Popconfirm
              title="确定删除门店?"
              onConfirm={() => { deleteStore(record) }}
              okText="确认"
              cancelText="取消"
            >
              <Button style={{ marginRight: '5px' }}>删除</Button>
            </Popconfirm>
            <Button onClick={() => { editClick(record) }}>编辑</Button>
          </div>
        ),
      },
    ]
  ), [deleteStore, editClick]);

  useEffect(() => {
    getStoreList();
  }, [page, formData, getStoreList]);

  const linkCreate = () => {
    history.push('/create?type=add');
  }

  const onFinish = (values) => {
    setPage(1);
    setFormData(values);
  };

  return (
    <div>
      <div className='headers'>
        <Form
          name="customized_form_controls"
          layout="inline"
          onFinish={onFinish}
        >
          <Form.Item name="name" label="店名" >
            <Input style={{width:'200px'}} />
          </Form.Item>
          <Form.Item name="city" label="所在城市" >
            <Select
              style={{width: 200,margin: '0 8px'}}
            >
              <Option value="rmb">RMB</Option>
              <Option value="dollar">Dollar</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{marginLeft:20}} onClick={linkCreate} type="primary">新增门店</Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        pagination={{
          total:totals,
          current: page,
          pageSize: pageSize,
          showTotal:total => `总共 ${total} 条`,
          onChange: (page, pageSize) => {
            console.log('page', page, pageSize);
            setPage(page);
            setPageSize(pageSize);
          }
        }}
      />
    </div>
  )
}

export default Home;