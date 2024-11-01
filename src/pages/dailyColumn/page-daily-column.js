import { useLayoutEffect, useState, useEffect } from "react";
import CommonLeftSidebar from "../../components/common/sidebar/common-left-sidebar";
import style from "./page-daily-column.module.css"
import DailyColumnMain from "../../components/dailycolumn/daily-column-main";
import DailyColumnRightSidebar from "../../components/dailycolumn/daily-column-right-sidebar";

const PageDailyColumn = ({user}) => {
    const [columnInfos, setColumnInfos] = useState([])
    const [column, setColumn] = useState({})

    useLayoutEffect(()=>{
        getColumnByDate()
        getColumnInfosBefore7days()
    },[])

    // 복습 데이터 가져오기
    const getColumnByDate = async (date) =>{
        // const response = await axiosInstance.get(`/learn/getDailyColumn?date=${date}`);
        // if (response.data === "" || response.data === null){
        //     alert("오늘의 할당량이 끝났습니다");
        //     window.location.replace("/")
        // }else{
        //     setQuestion(response.data)
        //     setLoading(false)
        // }

        setColumn({"topic": "Food",
        "title": "The Evolution of Korean Cuisine: A Fusion of Tradition and Trend",
        "column": `
      Korean cuisine, once confined to the peninsula, has burst onto the global stage, captivating palates worldwide. As the world becomes increasingly interconnected, so too do our culinary tastes. This evolution of Korean food is a fascinating blend of tradition, innovation, and global influences.
      
      **The Rise of Convenience Food**
      In a fast-paced world, the demand for convenient and time-saving meals has soared. South Korea, once renowned for its home-cooked meals, has witnessed a surge in the popularity of ready-to-eat and ready-to-cook foods. Instant noodles, frozen meals, and meal kits have become staples in many households. This shift can be attributed to factors such as the increasing number of single-person households, longer working hours, and a younger generation that prioritizes convenience.
      
      **Health Consciousness and Dietary Changes**
      The growing health consciousness among Koreans has led to significant changes in dietary habits. Traditional Korean cuisine, rich in fermented foods and vegetables, has always been considered healthy. However, with the rise of Western diets and the increasing prevalence of lifestyle diseases, there is a renewed interest in traditional Korean foods and their health benefits. This has led to a surge in demand for organic, locally sourced ingredients, and a growing interest in plant-based diets.
      
          * **Veganism and Vegetarianism:** The concept of veganism and vegetarianism, once considered niche, is gaining traction among young Koreans. This is driven by ethical concerns about animal welfare, environmental sustainability, and health benefits.
          * **Low-carbohydrate Diets:** Influenced by Western diet trends, low-carbohydrate diets such as keto and Atkins have become popular among those seeking weight loss or improved metabolic health.
          * **Functional Foods:** Korean consumers are increasingly seeking foods that offer specific health benefits beyond basic nutrition. Functional foods, such as probiotics and ginseng, are in high demand. 
      
      **K-Food Goes Global**
      Korean cuisine has captured the hearts and taste buds of people around the world. From bibimbap to kimchi, Korean food has become a global phenomenon. The Hallyu wave, or Korean Wave, has played a significant role in popularizing Korean culture, including food. Korean food's unique flavors, vibrant colors, and health benefits have contributed to its international appeal.
      
          * **Fusion Cuisine:** Korean chefs are experimenting with fusion cuisine, blending traditional Korean flavors with international ingredients and cooking techniques. This has resulted in a wide range of creative dishes that appeal to both locals and foreigners.
          * **Food Tourism:** Food tourism has become a major draw for visitors to South Korea. Culinary tours, cooking classes, and food festivals are increasingly popular.
      
      **The Impact of Technology**
      Technology has revolutionized the food industry in South Korea. Online food delivery platforms have made it easier than ever to order food from a variety of restaurants. Food delivery apps have also contributed to the rise of ghost kitchens, which are delivery-only restaurants that do not have a physical storefront. Additionally, technology is being used to improve food safety and traceability.
      
      **The Future of Korean Cuisine**
      The future of Korean cuisine is bright. As the world becomes more interconnected, Korean food will continue to evolve and adapt to new tastes and preferences. With a strong emphasis on tradition, innovation, and sustainability, Korean cuisine is poised to remain a global culinary force.
      
      Key trends that will shape the future of Korean cuisine include:
      
      * **Personalized nutrition:** Tailored meal plans and supplements based on individual genetic makeup and health goals.
      * **Sustainable food systems:** A focus on reducing food waste, supporting local farmers, and promoting sustainable agriculture.
      * **Plant-based proteins:** The development of plant-based alternatives to meat and dairy products.
      * **Food tech:** Advancements in food technology, such as 3D food printing and cultured meat.
      
      As Korean cuisine continues to evolve, it will undoubtedly play a significant role in shaping the global food landscape."
      `})
    }

    // 이전 7일의 데이터 정보만 가져오기
    const getColumnInfosBefore7days = async () =>{
        setColumnInfos([
            {topic : "Food", date : "24/10/25"},
            {topic : "Music", date : "24/10/26"},
            {topic : "Society", date : "24/10/27"},
            {topic : "Technology", date : "24/10/28"},
            {topic : "Relationships", date : "24/10/29"},
            {topic : "Animal", date : "24/10/30"},
            {topic : "Game", date : "24/11/1"}
        ])
    }

    // 컬럼마다 다른 백그라운드 색
    const handleTitleBackground = (topic) =>{
        switch(topic){
            case "Food" : return 'bg__llblue';
            case "Music" : return 'bg__navy';
            case "Society" : return 'bg__purple';
            case "Technology" : return 'bg__red';
            case "Relationships" : return 'bg__orange';
            case "Animal" : return 'bg__yellow';
            case "Game" : return 'bg__green';
        }
    }

    return (
        <div className={`${style['dailycolumn-page']}`}>
            <CommonLeftSidebar user={user}
                                title={"하루칼럼"} />
            <DailyColumnMain column={column}
                                handleTitleBackground = {handleTitleBackground}/>
            <DailyColumnRightSidebar columnInfos = {columnInfos} 
                                    setColumn ={setColumn} 
                                    getColumnByDate={getColumnByDate}
                                    handleTitleBackground={handleTitleBackground}/>
        </div>
    )
}
export default PageDailyColumn
