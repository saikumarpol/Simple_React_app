import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Modal } from 'antd';
import * as XLSX from 'xlsx';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:5001/teams');
      if (!response.ok) {
        throw new Error(`Failed to fetch teams: ${response.status} ${response.statusText}`);
      }
      const teams = await response.json();
      setData(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const exportToExcel = () => {
    try {
      const exportData = data.map((item) => ({
        Name: item.team_member_1_name,
        Department: item.team_member_1_department,
        Phone: item.team_member_1_phone,
        Email: item.team_member_1_email,
        RegisterNumber: item.team_member_1_register_number,
        TransactionID: item.transaction_id,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'TeamsData');
      XLSX.writeFile(workbook, 'teams_data.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'team_member_1_name',
      key: 'team_member_1_name',
      sorter: (a, b) => a.team_member_1_name.localeCompare(b.team_member_1_name),
      sortOrder: sortedInfo.columnKey === 'team_member_1_name' && sortedInfo.order,
    },
    {
      title: 'Department',
      dataIndex: 'team_member_1_department',
      key: 'team_member_1_department',
      sorter: (a, b) => a.team_member_1_department.localeCompare(b.team_member_1_department),
      sortOrder: sortedInfo.columnKey === 'team_member_1_department' && sortedInfo.order,
    },
    {
      title: 'Phone',
      dataIndex: 'team_member_1_phone',
      key: 'team_member_1_phone',
    },
    {
      title: 'Email',
      dataIndex: 'team_member_1_email',
      key: 'team_member_1_email',
    },
    {
      title: 'Register Number',
      dataIndex: 'team_member_1_register_number',
      key: 'team_member_1_register_number',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
    },
    {
      title: 'Payment Screenshot',
      dataIndex: 'payment_screenshot',
      key: 'payment_screenshot',
      render: (imageURL) => (
        <img
          src={`data:image/jpeg;base64,${imageURL}`}
          alt="Payment Screenshot"
          style={{ width: 50, height: 50, cursor: 'pointer' }}
          onClick={() => handleImageClick(imageURL)}
        />
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-9 py-32">
      <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '20px' }}>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={exportToExcel}>Export to Excel</Button>
          <Button onClick={clearFilters}>Clear Filters</Button>
          <Button onClick={clearAll}>Clear All</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        title="Payment Screenshot"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedImage && (
          <img
            src={`data:image/jpeg;base64,${selectedImage}`}
            alt="Payment Screenshot"
            style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
