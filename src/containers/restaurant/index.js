import React, {useEffect, useState} from "react";
import {Card, Row, Col, Button, Input, Form, Select, Modal, Upload, message, Pagination} from 'antd';

import {bindActionCreators} from "redux";
import * as kitchenActions from "../../actions/kitchenActions";
import {connect} from "react-redux";
import * as restaurantActions from "../../actions/restaurantActions";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
const {Option} = Select;

function Restaurant(props) {

const [modalVisible, setModalVisible] = useState(false)
const [imageUrl, setImageUrl] = useState(``)
const [search, setSearch] = useState({
    query: ``,
    page: 1
})
const [image, setImage] = useState(``)
const [loading, setLoading] = useState(false)
const [kitchens, setKitchens] = useState([])
const [formdata, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    amountOfPlace: "",
    image: "",
    averageBill: "",
    kitchens: [],
    rate: ""
})
const okHandler = () => {
    setModalVisible(false)
    console.log({...formdata, image, kitchens})
    props.restaurantActions.addRestaurant({...formdata, image, kitchens});

}
const { Meta } = Card;
const  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }


const [searchReq, setSearchReq] = useState("")
const modalVisibleHandler = () => {
    props.kitchenActions.getKitchens();
    setModalVisible(true)
}


const searchHandler = (e) => {
    setSearchReq(e.target.value)
  props.restaurantActions.getRestaurants({query: e.target.value, page: search.page})
}

useEffect( () => {
    async function fetchData() {
        await props.restaurantActions.getRestaurants(search);
    }
  
    fetchData();

}, [props.restaurantActions, search])



const deleteItem = item => {
    props.restaurantActions.deleteRestaurant(item.id)
}

const onChange = e => {
    const {value, name} = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }))
}
console.log(props.restaurant)
const data = props.restaurant?.restaurants?.map((item, i) => {
        return (
            <Col span={6}>
                <Card
                    hoverable
                    style={{ width: 240, margin: 20 }}
                    cover={<img alt="example" src={`http://localhost:5000/${item.image}`} />}
                >
                    <Meta title={item.name}/>
                    <Meta title={item.location}/>
                    <Meta title={item.averageBill}/>
                    <Meta title={item.phone}/>
                    <Button onClick={() => deleteItem(item)} style={{marginTop: 10}}>Delete</Button>
                </Card>
            </Col>
        )
    }
)
const handleChange = (value) => {
    setKitchens(value)
}
const onChangePage = e => {
    setSearch(prev => ({
        ...prev,
        page: e
    }))
    props.restaurantActions.getRestaurants({query: search.query, page: e})
}

const handleUploadChange = info => {
    console.log(info)
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setLoading(false)
        setImageUrl(imageUrl)
        setImage(info.file.originFileObj)
          
      }
      );
    }
  };
console.log(props.restaurant.total)

const children = props.kitchens.map((item, i) => <Option value={item.id} key={i}>{item.name}</Option>)
const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
return (
        <div>
            <Button type="primary" style={{display: "block", marginBottom: 10}} onClick={modalVisibleHandler}>Добавить ресторан</Button>
            <Input onChange={searchHandler} style={{marginBottom: 20}} placeholder="Введите название ресторана" />
                    <Row gutter={20}>
                        {data}
                    </Row>

                    <Pagination onChange={onChangePage} current={search.page} pageSize={2} total={Number(props.restaurant.total)}/>
        <Modal
            title="Basic Modal"
            visible={modalVisible}
            onOk={okHandler}
            onCancel={() => setModalVisible(false)}
         >
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            // initialValues={{ size: componentSize }}
            // onValuesChange={onFormLayoutChange}
            // size={componentSize}
           
        >
            <Form.Item
                label="Название ресторана"
                name="name"
               
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите название ресторана!',
                    },
                ]}
            >
                <Input name="name"  onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="Адрес"
                name="location"
                
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите адрес ресторана!',
                    },
                ]}
            >
                <Input name="location"  onChange={onChange}/>
            </Form.Item>
            <Form.Item
                label="Телефоный номер"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите телефонный номер ресторана!',
                    },
                ]}
            >
                <Input  name="phone" onChange={onChange}/>
            </Form.Item>
            <Form.Item
                label="Количество мест"
                name="amountOfPlace"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите вместимость ресторана!',
                    },
                ]}
            >
                <Input name="amountOfPlace" onChange={onChange}/>
            </Form.Item>
            <Form.Item
                label="Средний чек"
                name='averageBill'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите средний чек ресторана!',
                    },
                ]}
            >
                <Input  name="averageBill" onChange={onChange}/>
            </Form.Item>
            <Form.Item
                label="Кухня"
                name="kitchens"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста выберите кухню ресторана!',
                    },
                ]}
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Выберите кухню"
                    onChange={handleChange}
                >
                    {children}
                </Select>
            </Form.Item>
            <Form.Item
                label="Рейтинг"
                name='rate'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите рейтинг ресторана!',
                    },
                ]}
            >
                <Input name="rate" onChange={onChange}/>
            </Form.Item>
            <Form.Item
                label="Фото"
                name="image"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста загрузите фото ресторана!',
                    },
                ]}>
             <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
                >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
            </Form.Item>
        </Form>
    </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant
})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (Restaurant);