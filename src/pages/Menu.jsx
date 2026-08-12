import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Filter, Plus, Minus, Truck } from 'lucide-react';

// --- Soup image placeholders (Unsplash) ---
const SOUP_IMGS = {
  scallionsCorn:    'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  chickenCorn:      'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  vegManchow:       'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  chickenManchow:   'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  hotSourVeg:       'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  hotSourChicken:   'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  lemonCorVeg:      'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  lemonCorChicken:  'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  wontonNoodle:     'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
  chickenWonton:    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
  tofuVeg:          'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
  tomYumVeg:        'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop&q=80',
  tomYumPrawn:      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
  lungFung:         'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
};

// --- Starters ---
import imgVegSpringRolls from '../assets/veg spring rolls.webp';
import imgCrispyPotato from '../assets/crispy-honey-chilli-potatoes.webp';
import imgChilliPaneer from '../assets/chilli-paneer recipe.webp';
import imgPeriPeriFries from '../assets/Peri Peri Spicey French Fries.webp';
import imgCrispyVeg from "../assets/Crispy Vegetables- Salt n' Pepper.webp";
import imgChilliMushroom from '../assets/Crispy Fried Chilli Mushroom.webp';
import imgBabyCorn from '../assets/Crispy Fried Baby Corn Schezwan Chilli.webp';
import imgVegManchurian from '../assets/Vegetable Manchurian Dry.webp';
import imgLotusStem from '../assets/Lotus Stem Honey Chilli.webp';
import imgCrispyCornBhel from '../assets/Dragon Crispy Corn Bhel.webp';
import imgVegDimsums from '../assets/Veg Dimsums With Singaporian Chilli Sauce (6pcs).webp';
import imgPaneerDimsums from '../assets/Paneer Dimsums.webp';
import imgChickenSpringRoll from '../assets/Dragon Chicken Glass Noodle Spring Roll.webp';
import imgCrispyFish from '../assets/Crispy Fried Fish Chilli Garlic Sauce.webp';
import imgChilliChicken from '../assets/Chilli Chicken - Dry.webp';
import imgDrumsOfHeaven from '../assets/Drums Of Heaven Chicken Lollipop.webp';
import imgHoneyChilliChicken from '../assets/Crispy Fried Honey Chilli Seasame Chicken.webp';
import imgChickenSatay from '../assets/Thai Chicken Satay with Peanut Sauce.webp';
import imgGoldenPrawns from '../assets/Golden Fried Prawns with Hot Garlic Dip (6pcs).webp';
import imgThaiPrawnRolls from '../assets/Thai Prawns Spring Rolls (6pcs).webp';
import imgWokPrawns from '../assets/Jade Dragon Wok Prawns Choice of Sauce.webp';
import imgKungPaoChicken from '../assets/Wok Tossed Kung Pad Chicken.webp';
import imgShreddedChicken from '../assets/Shredded Crispy Chicken Chilli Garlic.webp';

// --- Asian Noodles ---
import imgSingaporeNoodlesVeg from '../assets/Rice Vermicelli Singaporian Noodles.webp';
import imgPadThaiVeg from '../assets/Pad Thai Noodles.webp';
import imgHakkaNoodlesVeg from '../assets/Hakka Noodles.webp';
import imgSchezwanNoodlesVeg from '../assets/Schezwan Chilli Noodles.webp';
import imgChilliGarlicNoodlesVeg from '../assets/Chilli Garlic Noodles.webp';
import imgCantoneseNoodlesVeg from '../assets/Dragon Cantonese Spicy Noodles.webp';
import imgPanFriedNoodlesVeg from '../assets/Pan Fried Noodle With Vegetables.webp';
import imgSingaporeNoodlesChicken from '../assets/Rice Vermicelli Singaporian Noodles Chicken.webp';
import imgPadThaiChicken from '../assets/Chicken Pad Thai Noodles.webp';
import imgEggHakkaNoodles from '../assets/Egg Hakka Noodles.webp';
import imgSchezwanNoodlesChicken from '../assets/Chicken Shcezwan Chilli Noodles.webp';
import imgChilliGarlicNoodlesChicken from '../assets/Chicken Chilli Garlic Noodles.webp';
import imgPanFriedNoodlesChicken from '../assets/Pan Fried Noodles With Chicken.webp';

// --- Fried Rice ---
import imgVegFriedRice from '../assets/Veg Fried Rice.webp';
import imgBurntGarlicRiceVeg from '../assets/Burnt Garlic Fried Rice.webp';
import imgVegChilliGarlicRice from '../assets/Veg Chilli Garlic Fried Rice.webp';
import imgSchezwanRiceVeg from '../assets/Schezwan Fried Rice.webp';
import imgGingerRice from '../assets/Ginger Fried Rice.webp';
import imgChickenFriedRice from '../assets/Chicken Fried Rice.webp';
import imgBurntGarlicRiceChicken from '../assets/Burnt Garlic Fried Rice Chicken.webp';
import imgEggFriedRice from '../assets/Egg Fried Rice.webp';
import imgSchezwanRiceChicken from '../assets/Chicken Schezwan Fried Rice.webp';
import imgChilliGarlicRiceChicken from '../assets/Chicken Chilli Garlic Fried Rice.webp';
import imgYangzhouRice from '../assets/Yangzhou Fried Rice- Seafood Chicken.webp';
import imgThaiRiceChicken from '../assets/Thai Fried Rice Chicken.webp';
import imgPrawnFriedRice from '../assets/Prawn Fried Rice.webp';

// --- Main Course ---
import imgStirFriedGreens from '../assets/Stir Fried Chinese Greens.webp';
import imgExoticVeg from '../assets/Exotic Vegetables Choice Of Sauce.webp';
import imgSweetSourVeg from "../assets/Sweet N' Sour Vegetables.webp";
import imgVegChopsuey from '../assets/Veg American Chopsuey.webp';
import imgVegThaiCurry from '../assets/Veg Thai Green- Red Curry Served With Steamed Rice.webp';
import imgJadeDragonThaiCurry from '../assets/Jade Dragon Wok Thai Curry Red-Green.webp';
import imgSweetSourChicken from "../assets/Sweet N' Sour Chicken.webp";
import imgSlicedFish from '../assets/Sliced Fish Choice Of Sauce.webp';
import imgChickenThaiCurry from '../assets/Chicken Thai Curry Red-Green.webp';
import imgButterPrawns from '../assets/Butter Chilli Garlic Prawns In Sauce.webp';
import imgPrawnsChilliSambal from '../assets/Prawns Chilli Sambal Sauce.webp';

// --- Desserts ---
import imgDarsaan from '../assets/Darsaan.webp';
import imgDatePancakes from '../assets/Date Pancakes.webp';
import imgBananaPancakes from '../assets/Banana Pancakes.webp';
import imgChocolateRoll from '../assets/Dragon Chocolate Roll.webp';

const MENU_CATEGORIES = ['Soups', 'Starters', 'Asian Noodles', 'Fried Rice', 'Main Course', 'Desserts'];

const MENU_DATA = {
  'Soups': {
    veg: [
      { name: "Jade Scallions Corn Soup", price: "₹130", desc: "Creamy sweet corn soup infused with fresh jade scallions and herbs.", img: SOUP_IMGS.scallionsCorn },
      { name: "Manchow Soup", price: "₹120", desc: "Classic hot and spicy soup served with crispy fried noodles.", img: SOUP_IMGS.vegManchow },
      { name: "Hot N' Sour Soup", price: "₹120", desc: "A tangy, fiery broth loaded with shredded bamboo shoots, tofu, and mushrooms.", img: SOUP_IMGS.hotSourVeg },
      { name: "Lemon Coriander Soup", price: "₹120", desc: "A refreshing clear broth flavored with fresh lemon juice and fresh coriander.", img: SOUP_IMGS.lemonCorVeg },
      { name: "Dragon Wonton Rice Noodle Soup", price: "₹130", desc: "Authentic broth with steamed vegetable wontons and thin rice noodles.", img: SOUP_IMGS.wontonNoodle },
      { name: "Wok Tofu Asian Veg Clear Soup", price: "₹120", desc: "Light vegetable broth featuring wok-seared tofu cubes and seasonal greens.", img: SOUP_IMGS.tofuVeg },
      { name: "Tom Yum Soup", price: "₹120", desc: "Thai lemongrass broth with hot chilis, mushrooms, and fresh lime leaf.", img: SOUP_IMGS.tomYumVeg }
    ],
    nonVeg: [
      { name: "Jade Scallions Chicken Corn Soup", price: "₹160", desc: "Jade corn soup base with tender shredded chicken.", img: SOUP_IMGS.chickenCorn },
      { name: "Manchow Chicken Soup", price: "₹160", desc: "Spicy chicken broth loaded with veggies and topped with crispy noodles.", img: SOUP_IMGS.chickenManchow },
      { name: "Hot N' Sour Chicken Soup", price: "₹160", desc: "Tangy and hot chicken broth with egg drop ribbons.", img: SOUP_IMGS.hotSourChicken },
      { name: "Lemon Coriander Chicken Soup", price: "₹160", desc: "Clear chicken soup with coriander leaf and fresh lime juice.", img: SOUP_IMGS.lemonCorChicken },
      { name: "Dragon Chicken Wonton Rice Noodle Soup", price: "₹170", desc: "Rice noodles and soft chicken wontons in hot seasoned broth.", img: SOUP_IMGS.chickenWonton },
      { name: "Chicken Lung Fung Soup", price: "₹160", desc: "Traditional thick chicken soup with egg shreds and mushrooms.", img: SOUP_IMGS.lungFung },
      { name: "Tom Yum Chicken Soup", price: "₹160", desc: "Spicy Thai lemongrass soup with tender chicken chunks.", img: SOUP_IMGS.tomYumVeg },
      { name: "Tom Yum Prawn Soup", price: "₹180", desc: "Fragrant Thai hot and sour soup loaded with fresh prawns.", img: SOUP_IMGS.tomYumPrawn },
      { name: "Jade Dragon Wok Sea Food Soup", price: "₹190", desc: "Our chef's signature seafood broth with prawns, fish, and crab meat.", img: SOUP_IMGS.tomYumPrawn }
    ]
  },
  'Starters': {
    veg: [
      { name: "Veg Spring Rolls", price: "₹160", desc: "Crispy rolls filled with seasoned sautéed glass noodles and vegetables.", img: imgVegSpringRolls },
      { name: "Crispy Potato - Chilli / Honey Chilli", price: "₹170", desc: "Crisp potato fingers tossed in choice of spicy dry red chili or sweet honey chili glaze.", img: imgCrispyPotato },
      { name: "Chilli Paneer - Dry / Sauce", price: "₹180", desc: "Fresh cottage cheese blocks tossed with capsicum, onions, and spicy soy-chili sauce.", img: imgChilliPaneer },
      { name: "Peri Peri Spicy French Fries", price: "₹190", desc: "Thick cut golden fries dusted with hot Peri Peri seasoning powder.", img: imgPeriPeriFries },
      { name: "Crispy Vegetables - Salt n' Pepper / Honey Chilli", price: "₹160", desc: "Assorted vegetables batter-fried and tossed in salt-pepper or sweet honey glaze.", img: imgCrispyVeg },
      { name: "Crispy Fried Chilli Mushroom / Honey Chilli Sesame", price: "₹190", desc: "Fresh button mushrooms tossed in spicy soy-chili or honey sesame glaze.", img: imgChilliMushroom },
      { name: "Crispy Fried Baby Corn Schezwan Chilli", price: "₹190", desc: "Crunchy baby corn tossed with hot garlic and red Schezwan chilis.", img: imgBabyCorn },
      { name: "Vegetable Manchurian Dry / Sauce", price: "₹180", desc: "Seasoned vegetable dumplings tossed in a tangy soy-garlic Manchurian sauce.", img: imgVegManchurian },
      { name: "Lotus Stem Honey Chilli", price: "₹180", desc: "Crispy lotus root slices glazed with honey, red chilis, and toasted sesame.", img: imgLotusStem },
      { name: "Dragon Crispy Corn Bhel", price: "₹170", desc: "Fritter-fried sweet corn kernels tossed with chopped onion, green chilis, and spices.", img: imgCrispyCornBhel },
      { name: "Jade Chinese Bhel", price: "₹140", desc: "Crispy noodles tossed with shredded raw cabbage, green onions, and sweet-spicy sauce.", img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80' },
      { name: "Veg Dimsums With Singaporean Chilli Sauce (6pcs)", price: "₹190", desc: "Hand-rolled vegetable dimsums served with Singaporean sweet-spicy dip.", img: imgVegDimsums },
      { name: "Paneer Dimsums", price: "₹210", desc: "Soft cottage cheese and green herb filling, steamed to perfection (6pcs).", img: imgPaneerDimsums },
      { name: "Pahadi Ragi Dimsums", price: "₹200", desc: "Healthy Himalayan finger millet dough wraps stuffed with mixed local vegetables.", img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
      { name: "Dragon Special Transparent Dimsums", price: "₹250", desc: "Thin crystal potato-starch wrappers with an upscale, seasoned vegetable filling.", img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' }
    ],
    nonVeg: [
      { name: "Dragon Chicken Glass Noodle Spring Roll", price: "₹200", desc: "Crispy wrapper filled with minced chicken, clear noodles, and mushrooms.", img: imgChickenSpringRoll },
      { name: "Crispy Fried Fish Chilli Garlic Sauce", price: "₹320", desc: "Tender fish fillets battered, fried, and tossed in thick chili-garlic glaze.", img: imgCrispyFish },
      { name: "Chilli Chicken - Dry / Sauce", price: "₹280", desc: "Wok-tossed boneless chicken pieces with green peppers, chilis, and dark soy.", img: imgChilliChicken },
      { name: "Drums Of Heaven Chicken Lollipop", price: "₹260", desc: "Deep-fried chicken drumettes glazed in a sweet-spicy ginger garlic sauce.", img: imgDrumsOfHeaven },
      { name: "Crispy Fried Honey Chilli Sesame Chicken", price: "₹260", desc: "Crisp chicken strips tossed in sweet honey, hot chilis, and sesame.", img: imgHoneyChilliChicken },
      { name: "Thai Chicken Satay with Peanut Sauce", price: "₹290", desc: "Grilled chicken skewers marinated in coconut-turmeric milk, served with warm peanut sauce.", img: imgChickenSatay },
      { name: "Golden Fried Prawns with Hot Garlic Dip (6pcs)", price: "₹640", desc: "Jumbo prawns crisped golden and served with a robust chili-garlic dipping sauce.", img: imgGoldenPrawns },
      { name: "Thai Prawns Spring Rolls (6pcs)", price: "₹640", desc: "Thai herb marinated prawns wrapped in spring roll sheets and fried.", img: imgThaiPrawnRolls },
      { name: "Jade Dragon Wok Prawns Choice of Sauce", price: "₹640", desc: "Fresh prawns tossed in your choice of Schezwan, Hot Garlic, or Black Bean sauce.", img: imgWokPrawns },
      { name: "Wok Tossed Kung Pao Chicken", price: "₹310", desc: "Classic stir-fry with diced chicken, dry red chilis, peppers, and peanuts.", img: imgKungPaoChicken },
      { name: "Shredded Crispy Chicken Chilli Garlic", price: "₹250", desc: "Fine strips of crispy chicken tossed with minced garlic and green chilis.", img: imgShreddedChicken },
      { name: "Chicken Dimsums With Singaporean Chilli Sauce (6pcs)", price: "₹250", desc: "Steamed chicken dumplings served alongside hot Singaporean chili dip.", img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
      { name: "Pahadi Ragi Dimsums Chicken", price: "₹250", desc: "Nutritious Himalayan ragi flour dumplings loaded with juicy chicken.", img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
      { name: "Dragon Special Transparent Dimsums Chicken", price: "₹320", desc: "Signature crystal dumplings filled with seasoned chicken breast chunks (6pcs).", img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  'Asian Noodles': {
    veg: [
      { name: "Rice Vermicelli Singaporean Noodles", price: "₹200", desc: "Thin rice vermicelli stir-fried with vegetables and yellow curry powder.", img: imgSingaporeNoodlesVeg },
      { name: "Pad Thai Noodles", price: "₹220", desc: "Flat rice noodles tossed with bean sprouts, peanuts, tofu, and tamarind glaze.", img: imgPadThaiVeg },
      { name: "Hakka Noodles", price: "₹150", desc: "Classic Indo-Chinese stir-fried wheat noodles with cabbage and carrots.", img: imgHakkaNoodlesVeg },
      { name: "Schezwan Chilli Noodles", price: "₹150", desc: "Wheat noodles tossed in hot, red Schezwan chili paste and garlic.", img: imgSchezwanNoodlesVeg },
      { name: "Chilli Garlic Noodles", price: "₹150", desc: "Spicy noodles loaded with fried golden garlic flakes and fresh chilis.", img: imgChilliGarlicNoodlesVeg },
      { name: "Dragon Cantonese Spicy Noodles", price: "₹170", desc: "Stir-fried noodles with a spicy, thick gravy glaze and mixed greens.", img: imgCantoneseNoodlesVeg },
      { name: "Pan Fried Noodle With Vegetables", price: "₹220", desc: "Crisp-fried noodle base topped with a savory clear sauce loaded with vegetables.", img: imgPanFriedNoodlesVeg }
    ],
    nonVeg: [
      { name: "Rice Vermicelli Singaporean Noodles Chicken", price: "₹250", desc: "Thin rice noodles stir-fried with chicken, egg, and mild curry powder.", img: imgSingaporeNoodlesChicken },
      { name: "Chicken Pad Thai Noodles", price: "₹270", desc: "Thai street style flat rice noodles with egg, chicken, peanuts, and lime.", img: imgPadThaiChicken },
      { name: "Chicken / Egg Hakka Noodles", price: "₹190", desc: "Stir-fried wheat noodles tossed with shredded chicken, scrambled egg, and scallions.", img: imgEggHakkaNoodles },
      { name: "Chicken Schezwan Chilli Noodles", price: "₹190", desc: "Noodles tossed in a fiery, hot Schezwan sauce with chicken chunks.", img: imgSchezwanNoodlesChicken },
      { name: "Chicken Chilli Garlic Noodles", price: "₹190", desc: "Wheat noodles stir-fried with garlic, red chilis, and seasoned chicken.", img: imgChilliGarlicNoodlesChicken },
      { name: "Dragon Cantonese Spicy Noodles Chicken", price: "₹220", desc: "Cantonese style wok-fried noodles tossed in rich soy sauce with chicken.", img: imgCantoneseNoodlesVeg },
      { name: "Pan Fried Noodles With Chicken", price: "₹270", desc: "Crispy noodles topped with chicken breast strips in a savory, thick brown sauce.", img: imgPanFriedNoodlesChicken }
    ]
  },
  'Fried Rice': {
    veg: [
      { name: "Veg Fried Rice", price: "₹150", desc: "Wok-tossed basmati rice with finely chopped carrots, beans, and spring onion.", img: imgVegFriedRice },
      { name: "Burnt Garlic Fried Rice", price: "₹150", desc: "Fluffy rice loaded with aromatic golden-browned garlic bits and green herbs.", img: imgBurntGarlicRiceVeg },
      { name: "Veg Chilli Garlic Fried Rice", price: "₹150", desc: "Basmati rice wok-tossed with red chilis and fresh garlic flakes.", img: imgVegChilliGarlicRice },
      { name: "Schezwan Fried Rice", price: "₹150", desc: "Rice tossed in hot and spicy house-made red Schezwan chili paste.", img: imgSchezwanRiceVeg },
      { name: "Ginger Fried Rice", price: "₹150", desc: "Basmati rice seasoned with fine ginger juliennes and mild herbs.", img: imgGingerRice },
      { name: "Jade Dragon Wok Fried Rice", price: "₹190", desc: "Chef's signature fried rice with exotic veggies and special house sauce.", img: 'https://images.unsplash.com/photo-1603133872878-685f588c2a3d?w=600&auto=format&fit=crop&q=80' }
    ],
    nonVeg: [
      { name: "Chicken Fried Rice", price: "₹200", desc: "Classic fried rice tossed with egg scramble and seasoned chicken cubes.", img: imgChickenFriedRice },
      { name: "Burnt Garlic Fried Rice Chicken", price: "₹200", desc: "Fragrant fried rice tossed with chicken and heavy burnt garlic flavor.", img: imgBurntGarlicRiceChicken },
      { name: "Egg Fried Rice", price: "₹180", desc: "Wok-tossed rice with scrambled eggs, white pepper, and green onions.", img: imgEggFriedRice },
      { name: "Chicken Schezwan Fried Rice", price: "₹200", desc: "Fiery red fried rice tossed with chicken chunks and Schezwan chili paste.", img: imgSchezwanRiceChicken },
      { name: "Chicken Chilli Garlic Fried Rice", price: "₹200", desc: "Fried rice seasoned with red chilis, lots of garlic, and chicken.", img: imgChilliGarlicRiceChicken },
      { name: "Yangzhou Fried Rice - Seafood Chicken", price: "₹230", desc: "Traditional Chinese style rice tossed with prawns, chicken, and egg.", img: imgYangzhouRice },
      { name: "Thai Fried Rice Chicken", price: "₹210", desc: "Jasmine rice tossed with chicken, pineapple bits, cashews, and fish sauce.", img: imgThaiRiceChicken },
      { name: "Prawn Fried Rice", price: "₹290", desc: "Rice stir-fried with juicy prawns, egg, and green onion.", img: imgPrawnFriedRice },
      { name: "Jade Dragon Wok Fried Rice Chicken / Seafood", price: "₹250", desc: "Signature wok rice tossed with mixed seafood, chicken, and secret spices.", img: 'https://images.unsplash.com/photo-1603133872878-685f588c2a3d?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  'Main Course': {
    veg: [
      { name: "Stir Fried Chinese Greens", price: "₹220", desc: "Exotic Chinese bok choy, broccoli, and snow peas tossed with light garlic.", img: imgStirFriedGreens },
      { name: "Exotic Vegetables Choice Of Sauce", price: "₹240", desc: "Exotic vegetables in your choice of Schezwan, Hot Garlic, or Sweet Sour sauce.", img: imgExoticVeg },
      { name: "Sweet N' Sour Vegetables", price: "₹240", desc: "Pineapple, peppers, and fried vegetables in a classic sweet and sour red sauce.", img: imgSweetSourVeg },
      { name: "Hachu Lachu Vegetables Spicy", price: "₹190", desc: "Mixed vegetables fried and tossed in a spicy, sour, dry chef special sauce.", img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80' },
      { name: "Veg American Chopsuey", price: "₹200", desc: "Crispy fried noodles topped with a sweet-sour tomato vegetable sauce and fried egg alternative.", img: imgVegChopsuey },
      { name: "Veg Thai Green / Red Curry Served With Steamed Rice", price: "₹260", desc: "Authentic Thai coconut curry packed with vegetables, served with Jasmine rice.", img: imgVegThaiCurry },
      { name: "Jade Dragon Wok Thai Curry", price: "₹300", desc: "Premium thick Thai curry loaded with exotic herbs and local organic veggies.", img: imgJadeDragonThaiCurry }
    ],
    nonVeg: [
      { name: "Sweet N' Sour Chicken", price: "₹250", desc: "Crispy chicken strips tossed in classic sweet pineapple tomato glaze.", img: imgSweetSourChicken },
      { name: "Sliced Fish Choice Of Sauce", price: "₹310", desc: "Tender fish slices cooked in choice of Schezwan, Black Bean, or Ginger Wine sauce.", img: imgSlicedFish },
      { name: "Sliced Chicken Choice Of Sauce", price: "₹280", desc: "Chicken breast slices cooked in hot garlic, black pepper, or soy ginger sauce.", img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80' },
      { name: "Chicken Thai Curry Red / Green", price: "₹330", desc: "Traditional Thai coconut curry loaded with chicken, served with steamed rice.", img: imgChickenThaiCurry },
      { name: "Jade Dragon Wok Thai Curry Red / Green", price: "₹350", desc: "Chef's signature spicy Thai curry with chicken, prawns, and bamboo shoots.", img: imgJadeDragonThaiCurry },
      { name: "Butter Chilli Garlic Prawns In Sauce", price: "₹640", desc: "Prawns simmered in a rich butter, garlic, and fresh green chili reduction sauce.", img: imgButterPrawns },
      { name: "Prawns Chilli Sambal Sauce", price: "₹640", desc: "Wok-cooked prawns tossed in hot Indonesian chili sambal sauce.", img: imgPrawnsChilliSambal }
    ]
  },
  'Desserts': {
    veg: [
      { name: "Darsaan", price: "₹190", desc: "Honey-glazed crispy noodle threads sprinkled with sesame seeds, served with vanilla ice cream.", img: imgDarsaan },
      { name: "Date Pancakes", price: "₹230", desc: "Fried pancakes stuffed with sweet date paste, served hot with ice cream.", img: imgDatePancakes },
      { name: "Banana Pancakes", price: "₹190", desc: "Warm sweet banana pancakes topped with honey drizzle.", img: imgBananaPancakes },
      { name: "Dragon Chocolate Roll", price: "₹230", desc: "Crispy rolls filled with melted dark chocolate sauce, served with ice cream.", img: imgChocolateRoll },
      { name: "Choice Of Icecream", price: "₹190", desc: "Selection of premium vanilla, chocolate, or strawberry scoops.", img: 'https://images.unsplash.com/photo-1501443715855-6cb290d78a45?w=600&auto=format&fit=crop&q=80' }
    ],
    nonVeg: []
  }
};

export default function Menu({ cart, addToCart, updateQty }) {
  const [selectedCat, setSelectedCat] = useState('Soups');

  // Returns the dish's own local image if available, otherwise falls back to Unsplash keyword mapping
  const getItemImage = (item) => {
    if (item.img) return item.img;
    const itemName = item.name || '';
    return getUnsplashFallback(itemName);
  };

  // Fallback Unsplash images by keyword (used only when no local asset is provided)
  const getUnsplashFallback = (itemName) => {
    const name = itemName.toLowerCase();
    
    // Dimsums & Dumplings (Bamboo Steamer Baskets)
    if (name.includes('dimsum') || name.includes('dumpling')) {
      return 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80';
    }
    // Wontons & Wonton Soups
    if (name.includes('wonton')) {
      return 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80';
    }
    // Spring Rolls
    if (name.includes('spring roll')) {
      return 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80';
    }
    // French Fries
    if (name.includes('french fries') || name.includes('potato')) {
      return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80';
    }
    // Cottage Cheese / Paneer / Tofu
    if (name.includes('paneer') || name.includes('tofu')) {
      return 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80';
    }
    // Mushrooms
    if (name.includes('mushroom')) {
      return 'https://images.unsplash.com/photo-1601303589002-8a3394ae6f20?w=600&auto=format&fit=crop&q=80';
    }
    // Baby Corn / Corn Bhel / Lotus Stem
    if (name.includes('baby corn') || name.includes('corn') || name.includes('lotus stem')) {
      return 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80';
    }
    // Fish
    if (name.includes('fish')) {
      return 'https://images.unsplash.com/photo-1573313496584-8d0277395c73?w=600&auto=format&fit=crop&q=80';
    }
    // Prawns & Seafood
    if (name.includes('prawn') || name.includes('seafood') || name.includes('sea food')) {
      return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80';
    }
    // Chicken Lollipops / Drums of Heaven
    if (name.includes('lollipop') || name.includes('drums')) {
      return 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&auto=format&fit=crop&q=80';
    }
    // Thai Chicken Satay
    if (name.includes('satay')) {
      return 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80';
    }
    // Pad Thai Noodles
    if (name.includes('pad thai')) {
      return 'https://images.unsplash.com/photo-1626804475315-9644b37a2fe4?w=600&auto=format&fit=crop&q=80';
    }
    // Vermicelli / Singapore Noodles
    if (name.includes('vermicelli') || name.includes('singaporian')) {
      return 'https://images.unsplash.com/photo-1617470703128-26a0fc9af10f?w=600&auto=format&fit=crop&q=80';
    }
    // Hakka / Chilli Garlic / Wok Noodles
    if (name.includes('noodle')) {
      return 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80';
    }
    // Thai Curry
    if (name.includes('thai curry') || name.includes('green/red curry') || name.includes('thai green')) {
      return 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop&q=80';
    }
    // Fried Rice
    if (name.includes('fried rice') || name.includes('rice')) {
      return 'https://images.unsplash.com/photo-1603133872878-685f588c2a3d?w=600&auto=format&fit=crop&q=80';
    }
    // Chicken Main Courses (Kung Pao, Sliced Chicken, Manchurian)
    if (name.includes('chicken') || name.includes('manchurian')) {
      return 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80';
    }
    // Pancakes (Banana, Date)
    if (name.includes('pancake')) {
      return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80';
    }
    // Ice cream
    if (name.includes('icecream') || name.includes('ice cream')) {
      return 'https://images.unsplash.com/photo-1501443715855-6cb290d78a45?w=600&auto=format&fit=crop&q=80';
    }
    // Chocolate Roll
    if (name.includes('chocolate')) {
      return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80';
    }
    // Darsaan
    if (name.includes('darsaan')) {
      return 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80';
    }
    // Fallback general soup/broth
    if (name.includes('soup')) {
      return 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80';
    }
    // Generic high-quality cooked dish fallback
    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80';
  };

  const currentCategoryData = MENU_DATA[selectedCat];
  
  // Merge Veg and Non Veg into a unified list to render in cards
  const mergedItems = [
    ...currentCategoryData.veg.map(item => ({ ...item, isVeg: true })),
    ...currentCategoryData.nonVeg.map(item => ({ ...item, isVeg: false }))
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-zinc-950 text-zinc-50 pt-20 lg:pt-28 pb-16 px-4 sm:px-12 md:px-20 max-w-7xl mx-auto flex flex-col gap-8"
    >
      {/* Back Button */}
      <div>
        <Link 
          to="/" 
          className="text-zinc-400 hover:text-cinnabar font-serif tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2 transition-colors border-b border-transparent hover:border-cinnabar pb-1 w-max"
        >
          <ArrowLeft size={12} /> Back to Storyboard
        </Link>
      </div>

      {/* Header title */}
      <div className="flex flex-col gap-3">
        <span className="text-cinnabar font-serif tracking-[0.3em] text-[10px] sm:text-xs uppercase block">THE FOOD CATALOGUE</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-wider">Our Menu — Chinese & Asian Dishes in Bidholi, Dehradun</h1>
      </div>

      {/* Category Selection Filter Navigation */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar border-b border-zinc-900 pb-4">
        {MENU_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCat(category)}
            className={`px-5 py-2 rounded-full border text-[10px] sm:text-xs tracking-wider uppercase font-sans whitespace-nowrap transition-all duration-300 cursor-pointer ${
              selectedCat === category
                ? 'bg-[#E34234] border-cinnabar text-white shadow-lg shadow-cinnabar/20'
                : 'bg-zinc-900/40 border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Card Grid Layout */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {mergedItems.map(item => {
            const cartItem = cart.find(i => i.name === item.name);
            const itemImg = getItemImage(item);

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.name}
                className="bg-zinc-900/30 border border-zinc-800/80 hover:border-cinnabar/30 transition-all rounded-3xl p-4 sm:p-5 flex flex-col justify-between h-[385px] group"
              >
                {/* Visual Image Header */}
                <div className="h-44 w-full rounded-2xl overflow-hidden relative border border-zinc-850">
                  <img 
                    src={itemImg} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Veg / Non Veg Badge */}
                  <span className={`absolute top-3 left-3 text-white text-[9px] font-sans tracking-widest uppercase font-semibold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1.5 ${
                    item.isVeg ? 'bg-emerald-600/90 border border-emerald-500/20' : 'bg-rose-600/90 border border-rose-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-300' : 'bg-rose-300'}`} />
                    {item.isVeg ? 'Veg' : 'Non Veg'}
                  </span>
                </div>

                {/* Content description */}
                <div className="mt-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-white tracking-wide group-hover:text-cinnabar transition-colors uppercase truncate max-w-full">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-sans line-clamp-2 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Cart Actions */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-900/80 flex-shrink-0">
                    <span className="font-serif text-sm sm:text-base font-semibold text-zinc-300">
                      {item.price}
                    </span>
                    
                    {cartItem ? (
                      <div className="flex items-center gap-3 bg-zinc-950 px-2.5 py-1.5 rounded-xl border border-zinc-850">
                        <button 
                          onClick={() => updateQty(item.name, -1)}
                          className="text-zinc-400 hover:text-cinnabar transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-bold text-white min-w-3 text-center font-sans">{cartItem.qty}</span>
                        <button 
                          onClick={() => updateQty(item.name, 1)}
                          className="text-zinc-400 hover:text-cinnabar transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart({ ...item, img: itemImg })}
                        className="bg-zinc-900 hover:bg-[#E34234] hover:border-cinnabar text-zinc-300 hover:text-white text-[10px] tracking-wider uppercase font-serif px-4 py-2 rounded-xl border border-zinc-800 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Plus size={10} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* FREE DELIVERY INFORMATION BANNER */}
      <div className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 mt-6">
        <div className="w-12 h-12 rounded-2xl bg-cinnabar/10 border border-cinnabar/20 flex items-center justify-center text-cinnabar flex-shrink-0">
          <Truck size={22} className="animate-pulse" />
        </div>
        <div className="flex-1 text-center sm:text-left font-sans">
          <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">Lounge Free Delivery Policy</h4>
          <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-relaxed">
            HOME DELIVERY IS COMPLETELY **FREE UPTO 5KMS** FROM OUR BIDHOLI LOCATION (COVERS UPES CAMPUS & NEARBY AREAS) WITH A MINIMUM BASKET VALUE OF **RS. 399**. 
            Standard delivery rates apply for zones beyond 5 km in Dehradun. Please confirm your delivery address when sending order confirmation via WhatsApp.
          </p>
        </div>
      </div>

      <div className="text-center text-zinc-600 font-sans text-xs tracking-widest uppercase flex justify-center items-center gap-1 mt-10">
        <Sparkles size={12} className="text-secondary" /> Jade Dragon Wok Cafe • Bidholi, Dehradun
      </div>
    </motion.div>
  );
}
