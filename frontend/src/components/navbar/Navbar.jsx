import { ArrowDropDownCircle, Notifications, Search } from '@mui/icons-material'
import { Axios } from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [dropDown, setDropDown] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const handleDropDown = () => {
        if (dropDown === false) {
            setDropDown(true)
        }
        else {
            setDropDown(false)
        }
    }

    window.onscroll = () => {
        setIsScrolled(window.scrollY <= 100 ? false : true)
        return () => (window.onscroll = null)
    }

    return (
        // main navbar div
        <div className={`ease-in-out text-lg duration-500 flex h-20 justify-between fixed w-full ${isScrolled ? "bg-main" : "bg-gradient-to-t from-transparent to-black/50"} z-50`}>

            {/* left div for logo and options */}
            <div className="flex justify-around w-2/3 items-center">
                <div className='w-48'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png" alt="logo" />
                </div>
                <div className="text-white flex w-2/3 justify-evenly items-center ">
                    <Link to="/">
                        <span className='cursor-pointer'>Home</span>
                    </Link>
                    <Link to="/movies">
                        <span className='cursor-pointer'>Movies</span>
                    </Link>
                    <Link to="/series">
                        <span className='cursor-pointer'>Series</span>
                    </Link>
                    <Link to="/my-list">
                        <span className='cursor-pointer'>My List</span>
                    </Link>
                    {/* <Link to="/">
                    <span className='cursor-pointer'>Popular</span>
                    </Link> */}
                </div>
            </div>

            {/* right div for sign in log in buttons */}
            <div className="flex text-white items-center w-60 justify-evenly mr-7">
                <Search className='cursor-pointer'></Search>
                <Notifications className='cursor-pointer'></Notifications>
                <div className='cursor-pointer'>
                    <img className='object-cover w-6' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUSEhIWEBMREBAWFhgSFRUXEBYWFRUWFhUXFxUYHSggGBolGxcTITEhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OGxAQGi0lICUrLS0tLS0tLS0tLisrLi0tLSstLS0tLS0rLS0tKy0tLSstKy0tLS0tLS03LS0tLS03Lf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwMEBQYIAgH/xABEEAACAgACBQgHBQQJBQAAAAAAAQIDBBEFBxIhMQYTQVFhcYGRIjJygpKhohRSU7HBI0JisggkM0Njc8LR4RaDo7Px/8QAGwEBAAMBAQEBAAAAAAAAAAAAAAEDBAIFBgf/xAAsEQEBAAIBAwIDBwUAAAAAAAAAAQIRAwQSIQUxImFxMjNBQlGRwQYjNKHx/9oADAMBAAIRAxEAPwCaAAAAAAAAAAAB8nNRTbaSSbbbySS4tvoRD/LzXHGG1Ro3KyW9SxElnXF8P2UX67/ie7qUuIEmcoOUWFwENvFXxpT9VPfZL2YLOUvBEV8odeTzccDht3RZiX81VB/nLwIgx+OtxFkrbrJXWTe+VknKT8X0dnAtwltGldYelMTnt42yCb9WhqmPd+zybXe2a/icdbb/AGltln+ZOUv5mW4A91Wyi84ycX1xbT80ZfAcrtIUNOrG4iOXQ7Zyh8E24vyMKAJO0Frrx1OSxNdeLj0tLmrvOK2X8JKPJXWVo/SDUI2cxc+FV+UJN9UJZ7M+5PPsOYA0B2gDnDkNrVxWAaqxDljMNuWUnnfWv8Ob4pfdlu6mjoDQemaMbTG/D2K2uXStzT6Yyi98ZLqYQvwAAAAAAAAAAAAAAAAAAAAAApYrERqhKyb2YVwlOTfBRim5PyTAiLX5yqcIw0dVLJ2JWYjL7n93W+9pyfsx6GQiZDlBpaeNxN2Kn619sp5fdjwhHujFRj4GPCQAAAAAAAAAADbtW3LKei8UpSbeGucY3x3tZcFYl96PHtWaNRAHZ8ZJpNPNNJprg0+DR9NG1M6aeK0ZXGTznhZSol3QSdf0SgvdZvIQAAAAAAAAAAAAAAAAAAAaXrix7o0TiNl5O3m6vCyaU/o2zdDQ9d2H29E3P8O3Dz/8ig/5wOawDYeSvJG/SUL5UOKlh1X6M80pue3uUuCa2enr4oi3Xmpk37NeBc6RwFuHsdV1cqrI8YzWT711rtW4tiQAAAG5ck9XWLxuU5r7LQ8nt2L05L+Cvi+95LvJW0Tq/wBHYeKj9njfLLfO9KyTfXk/RXckirPlxxWY8WWTncHRukOQmjbo5PCVw7aVzUl3OGXzIv5aatLsFF3YeTxNEd8ll+3rXXJLdOPaksurLeMebHLwZcWUaEAC1WmL+jpjWrMZRnulXTal2xcoSf1Q8ibjnjUDPLSc197BXLysqf6HQ4QAAAAAAAAAAAAAAAAAAAa9rDw3O6MxsMs/6pdJLpzhHbXzijYSli6FZCdb4WQnF+8mv1A40Jy1LYHm8A7XxxF9kl7MMq184z8yDZRcc01k45prpTW5o6c5L6P+zYPD08HXRWpe01nP6nIo57rHS/hnxbVtL6IoxcObxFUbo9G0t67Yy4xfamjQNL6nqZtyw2InTm/VtjzkO5STUl45kmgzY55Y+1aMsJl7oYWp3FZ78TRs9eVmfll+ptnJfVfhcJKNt0ni7YvOO1HZpi+hqvN7T9pvryRvYOry5WOZxYwABWsAABBGtnk1HB4mNtUNijEpvKPqxtj68UuCTTUkva6jRjpblhoCOkMLOh5KT9KuT/dsjnsvu3tPskzm7E4edU5V2RcJ1ycZRfGMk8mmbeHPuxY+XHtqQtQcc9KPswd7+upfqdEkB/0ecLnjcRb+HhFHxsti/wDQyfC1UAAAAAAAAAAAAAAAAAAAY7SGIkpZJtJJcDImM0pD0k+tZeRVzb7fC3i13eUEcvOSKwmkKLq4/wBXxeLqzXRCx2Jzh3PfJeK6Ca2WOmNHRxNTrkumE4vqnXJTg/iS8My9Zlyz7pNtOOHbaAA4dgAAAAAAABGOubk/RzKxsYNYjnaq5OPCxNNLaj0yWSSfHo37iTix0ro2OI5pT3xqxFdrT6XWpbP1OL8DrDLty24zx7pphNXfJZaNw+/P7ReoSuebyTWbjWlwyjtNZ9Lz7CQ8JPagm+OX5bjCmcw0NmMV2F/DbllbVPNJMZIqAA0s4AAAAAAAAAAAAAAAAUsTTtxa8u8qgizc0mXXlgJxaeT3NHwzWJwymup9DMM1lu6jFycdwrZx590fAAVrAAAAAAAAAAvcDhFNbUs8s9xOONyuo5yymM3VPA4falm/VXz7DLnyMUlklkj6buPDsjHnn3UAB24AAAAAAAAAAAAAAAAAAAMZpKnJ7S4Pj3mTPNkFJNPgzjkw7pp3hl23bAgqXVODyf8A9RTMFmm2XYAAkAAAAAeoQcmkuLM5VWopJdCLTR2HyW0+L4diL018OGpusnNnu6gAC9SAAAAAAAAAAAAAAAAAAAAAAAAtsfWnBt8YpteCMPCSazRm8b/Zz/y5/kzUqrXHh5GPqPGUbOnm8ayYKdVylw49XSVChaABskC40fXGc2nv2Um138DG34roj5/7F5yb9afsx/NnXH5zkRySzC1ngAeg88AAAAAAAAAAAAAAAAAAAAAAH1mD0nywwGGzVuLqUlxjCXOWfBDNryGkbZw+N5EeaR1u4SGapptvfQ5bNdb8W3L6T3yX5bT0nzsZVxpdbg1GMnLOMs97bSzyafQuKOu2+6JnLdNpx2N2/Rj6v5/8GFvr2X2dBfHiyG0sijl4++L+Hk7MvksCvDFSXHf3/wC5RkstzPh5/s9LxVy8Y+pFGy1y4v8A2PAGySBkcG3XvXHp6u7uLfC1fvPwLk2cHHr4qxdRy7vbGewuJVizW5riur/grGtTxXMp2N7KhGUm+xLN/I07R+uL8fCNLrpsTfwTS/mNUxt9mO5Se6Vgajo7WTo27LO50N9F8JQS75rOH1Gz4PGV3R2qrIWxfTXKMo+cWLLEyyq4AISAAAAAAAAAAAfG8t73JeRb6S0hVhqpXXTVddazlJ/kl0tvckuLZA3Ljl7fpFuuDdOFz3Vp+lZ22tcfZ4Lt4nWONrnLKYpG5Sa0sHhm4Up4yxZr9m0qE+2155+6maFpPWtpG3NVuvDRfDm4bU171mafekjRQWzCRRc7V/pLTOJxP9viLbs+ic5OHwZ7K8iyqR5PdfE6cqhsXIHSHMY2vN5Rtzql7+Wz9ah5munqMmmmnk000+premTZsl1XQwLPRGOWIoruX95XGT7Hl6S8HmvAvDK1qGJqzWa4otDJFniKsnmuDMnUcf5o2dNy/lqiVKa9p9nSeIrPcX1UNlZFfDx91+S3n5eyePd6R9AN7zmq6yNIczg5QT9K+Ua17PrT+Sy94iE3LWhpDnMVGpPdh69/t2ZSl9PNmmmjCajNyXdfJ8DxRbKuW1CUq5feg3GXxLee58CidOGz6M1gaSw+WzipWRX7t6Vi+KXpfUbjoTXG81HGYdZdM8O3u76pv8peBE4ObjK7mVjqPQum8PjYc5h7Y2x3Z5bpRfVKL3xfejIHK+i9JXYWxXUWSqsj0x6V1SXCUex7iduQHLuvSUebsSqxUI5ygvUsS4zrz6OuPFdq3lWWGluOe/FbkADhYAAAG/AGga4eUTw2FWHreVuL2otrjGmOXOPxzUe5y6iZN3SLdTaPdZXLB6Qv5uqX9Vok1DLhZJbna+vpUezf0s00A0SaZrd0ABKA918Twe6+IFQABCUdVekNuiyhvfTZtL2LM3/Mp+aN3Ib1faQ5nGwTeUbk6n1Zy3w+pRXiTIUck1Wjju8Q8zSaefAqV1uTyREfLflLiLbbMM06K65yhKCe+ey8s5y6U+OS3b+ko5c5hPL0Oi6TPqeTtxute6StFYqq5SlVZC3Zk4twknk0ZAgLRukbcNNWUzcJLq4NdUlwkuxk0ck9I2YzCxxE69jOUo+i84y2Xk5pcUs81l2Mr4OSWdsjV6l6flwfHvcv7sqeLrVCLlJ5RjFyb6klm35Hs1fWNpDmcHKKeUr5Kpdz9Kf0pr3jTJuvIt1Non0hjHfbZbLjbOUu7N5peCyXgW4BpZHyfAolafAogAAEhWwmJnTONtcnXZXJShKPrRa6f+OngUQB0lyG5Tx0lhlbujbB7F0F+7PLiv4ZLevFdDNhOddW/KH7DjYSk8qb8qrerKT9CfuyaefU5dZ0UZ88dVowy3AAHLsOctY+mPtekLpJ5wqlzNfVs1Np+c9t+KJ+0/j/ALNhb7/waLZrvjFuK88jltdu99L6WW8c/FVy38AAFqkAAA+xeR8AFVWHopQW8qhD1XNxalF5Si00+pp5p+Z0HoOz7VTXet0ba4y7c2t68HmvA56Jh1PaT5zCzob34e1texbnJfXzhXyTxtZxXzpvkIKKyW4h3W/hYQxkJx3StojKa7YtxjLvaWXuomQhHWviNvSEl+FTTD5Of+sw9T9h73ost6nx+laczpXReFhTTXVX6ldcIx7klvfa+Pic1HRnJjEc7g8NN8ZYalvv2En80yrpfet/r0vZhfw3V1fhU963P5EPa08ft4mNHRh696/jsyk/pUPMme2xQi5SeUYxcm+pJZt+RzdpbHvE323y43WTnv6E36K8FkvA9Hjnnb5XlvjS0PkpZH082IuUPMpngAJAAAAABo6S1f6XeMwFFsnnNQ5ub6XOt7Db78lL3jm0mLURjc6sTR9y2u1f9yLg/wD1LzK+SeHfHfKUQAUtDTNbuN5rRlqTyd1lNa8Zqcl8MJHP5LuvfG+jhaOudtr91KEf55kRF+Hsz8l+IAB24AAAAAFSo9lKLyKoQG3artJ8xj4RbyjiIyqfVtP0oP4ll7xqJ7pulCUZweUoSjKL6pRecX5pCzcTLq7dOHPfLbEc5j8TL/HnH4PQ/wBJPWjMdG+mu+Pq21QsXYpRTy8OHgc4YzEc7ZOz8Sc5/FJv9Ty+qviR9T6DjvPPL5T/AH/xRJ21ZYjb0dTnvcHbDysll8miCSYdTd+eEthn6mJbXYpwh+qkVdNfjb/W8N9Pv9LGS1n6T5jAWRTyliGqV3Szdn0Ka8SDCQNcWk+cxNeHT3UV7Uvbsyfyio/ER+evhNR8TyXeQAebGdOFM+ABIAAAAAEjajsVs4y6v8TCt+Nc4/pORHJtuqrFc3pTD9VnPVv3q5NfVGJzl7Jx946GABmakC65MbzmkXBPNUUUw9552P5Tj5GjGW5WY3n8bibfv4m3L2YycIfTGJiTVPEZbd0ABKAAAAAAKtbKR9i8gKwACEq8g9OZaJxMW/Swdd7XXszhKcPq214EVGQ0XpSVEMRBcMTRzb79uMk/JTXvFgeV1v24+w/p6f2cr83wknUxilGWKjJ5Lm6rN/BKDmpPykiNjI6I0pLDq9R434adPcpyhm/hUl4lHB95HpeqSXpM9/pv9lPTWkHisRbe/wC9tnJZ9EW/QXhHZXgWQB7j89GUZPM92PoKYAABIAAAAAGS5M4rmcZhrPuYqhvu5yKl8mzGiTa3riuHf0EDrbYBpf8A13X95eaBT2tHc5/nxfe/zPIBdGcABIAAAAAAAArQ4H0AIAAeZ1/2p9H139OfdZ/X+AAFHTfe4vR9X/w+T6fzAAHtPgFKfE8gBIAAAAAAAAAALkAHCX//2Q==" alt="" />
                </div>
                <div onMouseEnter={handleDropDown} onMouseLeave={handleDropDown}>
                    <ArrowDropDownCircle className='cursor-pointer'></ArrowDropDownCircle>
                    {/* <div className="flex flex-col hidden"> */}
                    <div className={`absolute bg-main p-2 space-y-1 ${dropDown ? "flex flex-col" : "hidden"}`}>
                        <span className='cursor-pointer'>Settings</span>
                        <span className='cursor-pointer'>Log Out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
