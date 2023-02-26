import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DeviceList from "../components/DeviceList";
import TypeBar from "../components/TypeBar";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { useEffect } from "react";
import { fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";


const Shop = observer( () => {
  const {device} = useContext(Context)

  useEffect(() => {
      fetchTypes().then(data => device.setTypes(data))
      fetchDevices().then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
      })
  }, [])

  //Закомменить нижний useEffect чтоб проверить страницу без подгрузки сервера
  /*useEffect(() => {
    fetchDevices(this.selectedType.id,device.page,2).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType]) */

  return (
      <Container>
        <Row className="mt-2 ">
        <Col md={3}>
          <TypeBar/>
        </Col> 
          <Col md={9}>
            <DeviceList/>
            <Pages/>
          </Col>
        </Row>
      </Container>
       
  );
});
 
export default Shop;