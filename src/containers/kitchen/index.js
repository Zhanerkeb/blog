import React, {useEffect, useState} from 'react';
import { Table, Space, Button, Modal, Input, Form } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as kitchenActions from '../../actions/kitchenActions'



function Kitchen(props) {
    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [form, setForm] = useState({
      name: ``
    })
    const [editForm, setEditForm] = useState({
      name: ``
    })
    useEffect( () => {
        async function fetchData() {
            await props.kitchenActions.getKitchens();
        }
        fetchData();
    }, [props.kitchenActions])
   
    const openModal = () => {
        setAddVisible(true)
    }

    const handleOk = () => {
      form.name && form.name.length && props.kitchenActions.addKitchen({name: form.name})
      setAddVisible(false)
    }

    const closeModal = () => {
      setAddVisible(false)
    }

    const closeEditModal = () => {
      setEditVisible(false)
    }

    const handleEdit = () => {
      editForm.name && editForm.id && props.kitchenActions.editKitchen(editForm)
      setEditVisible(false)
    }

    const onChange = e => {
      setForm({
        name: e.target.value
      })
    }

    const onEditChange = e => {
      const {name, value} = e.target;
      setEditForm(prev => ({
        ...prev,
        [name]: value
      }))
    }

    const openEditModal = item => {
      setEditVisible(true)
      setEditForm({name: item.name, id: item.id})
    }

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: text => <h3>{text}</h3>,
      },
      {
        title: 'Действия',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button type="link" onClick={() => openEditModal(record)}>Редактировать</Button>
            <Button type="link">Удалить</Button>
          </Space>
        ),
      },
    ];

    const data = props.kitchens.map((item, i) => {
      return {
          key:i, 
          name: item.name,
          id: item.id
        }
    })

    return(
        <div>
          <Button type="primary" onClick={openModal}>Добавить кухню</Button>
          <Table columns={columns} dataSource={data} />
          <Modal
              title="Введите название новой кухни"
              visible={addVisible}
              onCancel={closeModal}
              cancelText="Закрыть"
              okText="Добавить кухню"
              onOk={handleOk}
            >
              <Form>
                <Form.Item>
                  <Input
                      placeholder="Ваше название"                   
                      onChange={onChange}
                  />
                </Form.Item>               
              </Form>               
            </Modal>
            <Modal
              title="Редактирование кухни"
              visible={editVisible}
              onCancel={closeEditModal}
              cancelText="Закрыть"
              okText="Добавить кухню"
              onOk={handleEdit}
            >
              <Form>
                <Form.Item>
                  <Input
                    name="name"
                    value={editForm.name}
                    placeholder="Ваше название"                   
                    onChange={onEditChange}
                  />
                </Form.Item>               
              </Form>               
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.kitchen.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens
})

const mapDispatchToProps = dispatch => ({
    kitchenActions: bindActionCreators(kitchenActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (Kitchen);