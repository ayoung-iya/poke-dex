import styled from "@emotion/styled"
import PokeNameChip from "../Common/PokeNameChip"
import PokeMarkChip from "../Common/PokeMarkChip";

const TempImgUrl = 'https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800';

const PokeCard = () => {
  return (
    <Item>
      <Header>
        <PokeNameChip />
      </Header>
      <Body>
        <Image src={TempImgUrl} alt="이상해씨 이미지"/>
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  )
}

const Item = styled.li`
  display: flex;
  flex-direction: column;

  padding: 8px;

  width: 250px;
  height: 300px;
  
  border: 1px solid #c0c0c0;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
`

const Header = styled.section `
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`
const Body = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`
const Image = styled.img`
  width: 180px;
  height: 180px;

`

const Footer = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`

export default PokeCard