import HeaderComponent from "../HeaderComponent/HeaderComponent";

const DefaultComponent = ({children}) => {
    return <>
        <HeaderComponent />
        {children}
    </>
}

export default DefaultComponent;