import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Fade,
  Zoom,
  Slide,
  Grow,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  Restaurant as RestaurantIcon,
  MonitorWeight as MonitorWeightIcon,
  Whatshot as WhatshotIcon,
  Timer as TimerIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  EmojiEvents as EmojiEventsIcon,
  SelfImprovement as SelfImprovementIcon,
  WaterDrop as WaterDropIcon,
  Bedtime as BedtimeIcon,
  Apple as AppleIcon,
  Fastfood as FastfoodIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  BreakfastDining as BreakfastDiningIcon,
  LunchDining as LunchDiningIcon,
  DinnerDining as DinnerDiningIcon,
  Cake as CakeIcon,
  Egg as EggIcon,
  BakeryDining as BakeryDiningIcon,
  Icecream as IcecreamIcon,
  RamenDining as RamenDiningIcon,
  SetMeal as SetMealIcon,
} from '@mui/icons-material';
import styles from './Diet.module.css';

const Diet = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isDarkMode = theme.palette.mode === 'dark';
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const mealCategories = [
    { id: 'all', label: 'All Meals', icon: <RestaurantIcon /> },
    { id: 'breakfast', label: 'Breakfast', icon: <BreakfastDiningIcon /> },
    { id: 'lunch', label: 'Lunch', icon: <LunchDiningIcon /> },
    { id: 'dinner', label: 'Dinner', icon: <DinnerDiningIcon /> },
    { id: 'snacks', label: 'Snacks', icon: <CakeIcon /> },
  ];

  const mealPlan = {
    monday: {
      breakfast: {
        name: 'Oatmeal with Berries',
        calories: 350,
        protein: 12,
        carbs: 45,
        fats: 8,
        time: '8:00 AM',
        ingredients: ['Oats', 'Mixed Berries', 'Almond Milk', 'Honey', 'Chia Seeds'],
        instructions: 'Cook oats with almond milk, top with berries and honey.',
        icon: <BreakfastDiningIcon />,
      },
      lunch: {
        name: 'Grilled Chicken Salad',
        calories: 420,
        protein: 35,
        carbs: 20,
        fats: 22,
        time: '12:30 PM',
        ingredients: ['Chicken Breast', 'Mixed Greens', 'Cherry Tomatoes', 'Avocado', 'Olive Oil'],
        instructions: 'Grill chicken, slice and serve over greens with vegetables.',
        icon: <LunchDiningIcon />,
      },
      dinner: {
        name: 'Salmon with Quinoa',
        calories: 480,
        protein: 40,
        carbs: 35,
        fats: 20,
        time: '7:00 PM',
        ingredients: ['Salmon Fillet', 'Quinoa', 'Broccoli', 'Lemon', 'Garlic'],
        instructions: 'Bake salmon, cook quinoa, steam broccoli, serve with lemon.',
        icon: <DinnerDiningIcon />,
      },
      snacks: {
        name: 'Greek Yogurt with Nuts',
        calories: 200,
        protein: 15,
        carbs: 12,
        fats: 10,
        time: '4:00 PM',
        ingredients: ['Greek Yogurt', 'Mixed Nuts', 'Honey'],
        instructions: 'Mix yogurt with nuts and drizzle honey.',
        icon: <CakeIcon />,
      },
    },
    tuesday: {
      breakfast: {
        name: 'Scrambled Eggs with Toast',
        calories: 380,
        protein: 22,
        carbs: 30,
        fats: 18,
        time: '8:00 AM',
        ingredients: ['Eggs', 'Whole Grain Bread', 'Spinach', 'Avocado'],
        instructions: 'Scramble eggs with spinach, serve with toast and avocado.',
        icon: <EggIcon />,
      },
      lunch: {
        name: 'Turkey Sandwich',
        calories: 400,
        protein: 30,
        carbs: 35,
        fats: 15,
        time: '12:30 PM',
        ingredients: ['Turkey Breast', 'Whole Grain Bread', 'Lettuce', 'Tomato', 'Mustard'],
        instructions: 'Layer turkey, lettuce, tomato on bread with mustard.',
        icon: <BakeryDiningIcon />,
      },
      dinner: {
        name: 'Beef Stir Fry',
        calories: 450,
        protein: 38,
        carbs: 30,
        fats: 18,
        time: '7:00 PM',
        ingredients: ['Beef Strips', 'Mixed Vegetables', 'Soy Sauce', 'Garlic', 'Ginger'],
        instructions: 'Stir fry beef with vegetables and sauce.',
        icon: <RamenDiningIcon />,
      },
      snacks: {
        name: 'Apple with Peanut Butter',
        calories: 180,
        protein: 8,
        carbs: 22,
        fats: 8,
        time: '4:00 PM',
        ingredients: ['Apple', 'Peanut Butter'],
        instructions: 'Slice apple and serve with peanut butter.',
        icon: <AppleIcon />,
      },
    },
    wednesday: {
      breakfast: {
        name: 'Smoothie Bowl',
        calories: 320,
        protein: 15,
        carbs: 40,
        fats: 10,
        time: '8:00 AM',
        ingredients: ['Banana', 'Berries', 'Greek Yogurt', 'Granola', 'Honey'],
        instructions: 'Blend fruits and yogurt, top with granola and honey.',
        icon: <BreakfastDiningIcon />,
      },
      lunch: {
        name: 'Tuna Salad Wrap',
        calories: 380,
        protein: 28,
        carbs: 25,
        fats: 18,
        time: '12:30 PM',
        ingredients: ['Tuna', 'Whole Wheat Wrap', 'Lettuce', 'Celery', 'Mayo'],
        instructions: 'Mix tuna with celery and mayo, wrap with lettuce.',
        icon: <LunchDiningIcon />,
      },
      dinner: {
        name: 'Chicken Curry',
        calories: 460,
        protein: 35,
        carbs: 40,
        fats: 16,
        time: '7:00 PM',
        ingredients: ['Chicken', 'Curry Sauce', 'Rice', 'Vegetables', 'Coconut Milk'],
        instructions: 'Cook chicken in curry sauce, serve with rice.',
        icon: <DinnerDiningIcon />,
      },
      snacks: {
        name: 'Trail Mix',
        calories: 160,
        protein: 6,
        carbs: 18,
        fats: 8,
        time: '4:00 PM',
        ingredients: ['Mixed Nuts', 'Dried Fruits', 'Dark Chocolate'],
        instructions: 'Mix nuts, fruits, and chocolate pieces.',
        icon: <CakeIcon />,
      },
    },
    thursday: {
      breakfast: {
        name: 'Avocado Toast',
        calories: 340,
        protein: 10,
        carbs: 28,
        fats: 20,
        time: '8:00 AM',
        ingredients: ['Avocado', 'Whole Grain Bread', 'Egg', 'Salt', 'Pepper'],
        instructions: 'Mash avocado on toast, top with poached egg.',
        icon: <BreakfastDiningIcon />,
      },
      lunch: {
        name: 'Quinoa Bowl',
        calories: 410,
        protein: 18,
        carbs: 45,
        fats: 16,
        time: '12:30 PM',
        ingredients: ['Quinoa', 'Black Beans', 'Corn', 'Avocado', 'Lime'],
        instructions: 'Mix quinoa with beans, corn, avocado, and lime juice.',
        icon: <LunchDiningIcon />,
      },
      dinner: {
        name: 'Shrimp Pasta',
        calories: 440,
        protein: 32,
        carbs: 42,
        fats: 14,
        time: '7:00 PM',
        ingredients: ['Shrimp', 'Pasta', 'Garlic', 'Olive Oil', 'Parsley'],
        instructions: 'Cook pasta, sauté shrimp with garlic, combine.',
        icon: <DinnerDiningIcon />,
      },
      snacks: {
        name: 'Hummus with Veggies',
        calories: 150,
        protein: 5,
        carbs: 15,
        fats: 8,
        time: '4:00 PM',
        ingredients: ['Hummus', 'Carrot Sticks', 'Cucumber', 'Bell Pepper'],
        instructions: 'Serve hummus with fresh vegetable sticks.',
        icon: <CakeIcon />,
      },
    },
    friday: {
      breakfast: {
        name: 'Pancakes with Berries',
        calories: 390,
        protein: 14,
        carbs: 48,
        fats: 14,
        time: '8:00 AM',
        ingredients: ['Flour', 'Milk', 'Eggs', 'Berries', 'Maple Syrup'],
        instructions: 'Make pancakes, top with berries and syrup.',
        icon: <BreakfastDiningIcon />,
      },
      lunch: {
        name: 'Chicken Caesar Wrap',
        calories: 420,
        protein: 32,
        carbs: 28,
        fats: 20,
        time: '12:30 PM',
        ingredients: ['Chicken', 'Romaine', 'Parmesan', 'Wrap', 'Caesar Dressing'],
        instructions: 'Wrap chicken, lettuce, parmesan in wrap with dressing.',
        icon: <LunchDiningIcon />,
      },
      dinner: {
        name: 'Grilled Fish Tacos',
        calories: 430,
        protein: 34,
        carbs: 38,
        fats: 16,
        time: '7:00 PM',
        ingredients: ['White Fish', 'Tortillas', 'Cabbage Slaw', 'Lime', 'Cilantro'],
        instructions: 'Grill fish, serve in tortillas with slaw and lime.',
        icon: <DinnerDiningIcon />,
      },
      snacks: {
        name: 'Rice Cakes with Avocado',
        calories: 140,
        protein: 3,
        carbs: 16,
        fats: 7,
        time: '4:00 PM',
        ingredients: ['Rice Cakes', 'Avocado', 'Salt', 'Pepper'],
        instructions: 'Top rice cakes with mashed avocado and season.',
        icon: <CakeIcon />,
      },
    },
    saturday: {
      breakfast: {
        name: 'French Toast',
        calories: 370,
        protein: 16,
        carbs: 38,
        fats: 16,
        time: '9:00 AM',
        ingredients: ['Bread', 'Eggs', 'Milk', 'Cinnamon', 'Maple Syrup'],
        instructions: 'Dip bread in egg mixture, fry until golden, serve with syrup.',
        icon: <BreakfastDiningIcon />,
      },
      lunch: {
        name: 'Mediterranean Bowl',
        calories: 440,
        protein: 20,
        carbs: 42,
        fats: 20,
        time: '1:00 PM',
        ingredients: ['Couscous', 'Feta', 'Olives', 'Cucumber', 'Tomato'],
        instructions: 'Mix couscous with vegetables, feta, and olives.',
        icon: <LunchDiningIcon />,
      },
      dinner: {
        name: 'Steak with Roasted Vegetables',
        calories: 520,
        protein: 42,
        carbs: 30,
        fats: 26,
        time: '7:30 PM',
        ingredients: ['Sirloin Steak', 'Potatoes', 'Carrots', 'Broccoli', 'Garlic'],
        instructions: 'Grill steak, roast vegetables with garlic and herbs.',
        icon: <DinnerDiningIcon />,
      },
      snacks: {
        name: 'Fruit Salad',
        calories: 120,
        protein: 2,
        carbs: 28,
        fats: 1,
        time: '3:00 PM',
        ingredients: ['Mixed Fruits', 'Honey', 'Mint'],
        instructions: 'Chop fruits, drizzle with honey, garnish with mint.',
        icon: <AppleIcon />,
      },
    },
    sunday: {
      breakfast: {
        name: 'Egg Benedict',
        calories: 420,
        protein: 24,
        carbs: 28,
        fats: 24,
        time: '9:00 AM',
        ingredients: ['English Muffin', 'Poached Eggs', 'Hollandaise', 'Ham'],
        instructions: 'Toast muffin, top with ham, poached egg, and sauce.',
        icon: <BreakfastDiningIcon />,
      },
      lunch: {
        name: 'Roast Chicken Dinner',
        calories: 500,
        protein: 38,
        carbs: 35,
        fats: 22,
        time: '1:00 PM',
        ingredients: ['Chicken', 'Potatoes', 'Vegetables', 'Gravy', 'Herbs'],
        instructions: 'Roast chicken with potatoes and vegetables, serve with gravy.',
        icon: <LunchDiningIcon />,
      },
      dinner: {
        name: 'Vegetable Soup',
        calories: 280,
        protein: 12,
        carbs: 38,
        fats: 8,
        time: '6:30 PM',
        ingredients: ['Mixed Vegetables', 'Vegetable Broth', 'Herbs', 'Pasta'],
        instructions: 'Simmer vegetables in broth with herbs and pasta.',
        icon: <DinnerDiningIcon />,
      },
      snacks: {
        name: 'Dark Chocolate',
        calories: 150,
        protein: 3,
        carbs: 14,
        fats: 10,
        time: '3:00 PM',
        ingredients: ['Dark Chocolate', 'Almonds'],
        instructions: 'Enjoy a few squares of dark chocolate with almonds.',
        icon: <CakeIcon />,
      },
    },
  };

  const getDayMeals = (dayIndex) => {
    const dayKey = days[dayIndex].toLowerCase();
    return mealPlan[dayKey] || {};
  };

  const getFilteredMeals = (dayIndex) => {
    const meals = getDayMeals(dayIndex);
    if (selectedMeal === 'all') return meals;
    return { [selectedMeal]: meals[selectedMeal] };
  };

  const currentDayMeals = getFilteredMeals(selectedDay);
  const dayKeys = Object.keys(currentDayMeals);

  const handleDayChange = (event, newValue) => {
    setSelectedDay(newValue);
  };

  const getTotalCalories = (dayIndex) => {
    const meals = getDayMeals(dayIndex);
    let total = 0;
    Object.values(meals).forEach(meal => {
      total += meal.calories || 0;
    });
    return total;
  };

  const getTotalProtein = (dayIndex) => {
    const meals = getDayMeals(dayIndex);
    let total = 0;
    Object.values(meals).forEach(meal => {
      total += meal.protein || 0;
    });
    return total;
  };

  const getTotalCarbs = (dayIndex) => {
    const meals = getDayMeals(dayIndex);
    let total = 0;
    Object.values(meals).forEach(meal => {
      total += meal.carbs || 0;
    });
    return total;
  };

  const getTotalFats = (dayIndex) => {
    const meals = getDayMeals(dayIndex);
    let total = 0;
    Object.values(meals).forEach(meal => {
      total += meal.fats || 0;
    });
    return total;
  };

  const mealColors = {
    breakfast: '#e94560',
    lunch: '#4ecdc4',
    dinner: '#ffe66d',
    snacks: '#a29bfe',
  };

  const mealIcons = {
    breakfast: <BreakfastDiningIcon />,
    lunch: <LunchDiningIcon />,
    dinner: <DinnerDiningIcon />,
    snacks: <CakeIcon />,
  };

  return (
    <Box className={`${styles.dietContainer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      {/* Hero Section */}
      <Box className={styles.heroSection}>
        <Container maxWidth="lg">
          <Box className={styles.heroContent}>
            <Fade in timeout={1000}>
              <Box className={styles.heroTextContainer}>
                <Box className={styles.chipWrapper}>
                  <Chip
                    label="DIET PLAN"
                    className={styles.heroChip}
                    icon={<RestaurantIcon />}
                  />
                </Box>
                <Typography variant="h1" className={styles.heroTitle} align="center">
                  Your Personalized
                  <span className={styles.heroHighlight}> Diet Plan</span>
                </Typography>
                <Typography variant="body1" className={styles.heroSubtitle} align="center">
                  Get customized meal plans designed to help you achieve your fitness
                  goals with balanced nutrition and delicious recipes.
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Container>
        <IconButton
          className={styles.scrollDownButton}
          onClick={() => document.getElementById('diet-plan').scrollIntoView({ behavior: 'smooth' })}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      {/* Diet Plan Section */}
      <Box id="diet-plan" className={styles.dietSection}>
        <Container maxWidth="lg">
          <Box className={styles.dietWrapper}>
            {/* Summary Cards */}
            <Box className={styles.summaryContainer}>
              <Box className={styles.summaryFlex}>
                <Box className={styles.summaryCardWrapper}>
                  <Zoom in timeout={300}>
                    <Paper className={styles.summaryCard}>
                      <Box className={styles.summaryIconWrapper} style={{ background: 'rgba(233, 69, 96, 0.1)' }}>
                        <LocalFireDepartmentIcon className={styles.summaryIcon} style={{ color: '#e94560' }} />
                      </Box>
                      <Typography variant="caption" className={styles.summaryLabel}>
                        Daily Calories
                      </Typography>
                      <Typography variant="h4" className={styles.summaryValue}>
                        {getTotalCalories(selectedDay)}
                      </Typography>
                      <Typography variant="caption" className={styles.summarySub}>
                        kcal
                      </Typography>
                    </Paper>
                  </Zoom>
                </Box>

                <Box className={styles.summaryCardWrapper}>
                  <Zoom in timeout={400}>
                    <Paper className={styles.summaryCard}>
                      <Box className={styles.summaryIconWrapper} style={{ background: 'rgba(78, 205, 196, 0.1)' }}>
                        <WhatshotIcon className={styles.summaryIcon} style={{ color: '#4ecdc4' }} />
                      </Box>
                      <Typography variant="caption" className={styles.summaryLabel}>
                        Protein
                      </Typography>
                      <Typography variant="h4" className={styles.summaryValue}>
                        {getTotalProtein(selectedDay)}g
                      </Typography>
                      <Typography variant="caption" className={styles.summarySub}>
                        {Math.round((getTotalProtein(selectedDay) * 4 / getTotalCalories(selectedDay)) * 100)}%
                      </Typography>
                    </Paper>
                  </Zoom>
                </Box>

                <Box className={styles.summaryCardWrapper}>
                  <Zoom in timeout={500}>
                    <Paper className={styles.summaryCard}>
                      <Box className={styles.summaryIconWrapper} style={{ background: 'rgba(255, 230, 109, 0.1)' }}>
                        <AppleIcon className={styles.summaryIcon} style={{ color: '#ffe66d' }} />
                      </Box>
                      <Typography variant="caption" className={styles.summaryLabel}>
                        Carbs
                      </Typography>
                      <Typography variant="h4" className={styles.summaryValue}>
                        {getTotalCarbs(selectedDay)}g
                      </Typography>
                      <Typography variant="caption" className={styles.summarySub}>
                        {Math.round((getTotalCarbs(selectedDay) * 4 / getTotalCalories(selectedDay)) * 100)}%
                      </Typography>
                    </Paper>
                  </Zoom>
                </Box>

                <Box className={styles.summaryCardWrapper}>
                  <Zoom in timeout={600}>
                    <Paper className={styles.summaryCard}>
                      <Box className={styles.summaryIconWrapper} style={{ background: 'rgba(162, 155, 254, 0.1)' }}>
                        <FastfoodIcon className={styles.summaryIcon} style={{ color: '#a29bfe' }} />
                      </Box>
                      <Typography variant="caption" className={styles.summaryLabel}>
                        Fats
                      </Typography>
                      <Typography variant="h4" className={styles.summaryValue}>
                        {getTotalFats(selectedDay)}g
                      </Typography>
                      <Typography variant="caption" className={styles.summarySub}>
                        {Math.round((getTotalFats(selectedDay) * 9 / getTotalCalories(selectedDay)) * 100)}%
                      </Typography>
                    </Paper>
                  </Zoom>
                </Box>
              </Box>
            </Box>

            {/* Day Selector - Centered */}
            <Box className={styles.daySelector}>
              <Tabs
                value={selectedDay}
                onChange={handleDayChange}
                variant="scrollable"
                scrollButtons="auto"
                className={styles.dayTabs}
                TabIndicatorProps={{
                  className: styles.tabIndicator,
                }}
                centered
              >
                {days.map((day, index) => (
                  <Tab
                    key={index}
                    label={day}
                    className={styles.dayTab}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Meal Type Filter - Centered */}
            <Box className={styles.mealFilter}>
              <Tabs
                value={selectedMeal}
                onChange={(e, v) => setSelectedMeal(v)}
                variant="scrollable"
                scrollButtons="auto"
                className={styles.mealTabs}
                TabIndicatorProps={{
                  className: styles.mealTabIndicator,
                }}
                centered
              >
                {mealCategories.map((category) => (
                  <Tab
                    key={category.id}
                    value={category.id}
                    label={
                      <Box className={styles.mealTabLabel}>
                        {category.icon}
                        <Typography variant="caption" className={styles.mealTabText}>
                          {category.label}
                        </Typography>
                      </Box>
                    }
                    className={styles.mealTab}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Meals Container - Scrollable in one line */}
            <Box className={styles.mealsContainer}>
              {dayKeys.length === 0 ? (
                <Box className={styles.noMeals}>
                  <RestaurantIcon className={styles.noMealsIcon} />
                  <Typography variant="h5" className={styles.noMealsTitle}>
                    No meals for this filter
                  </Typography>
                  <Typography variant="body2" className={styles.noMealsSubtitle}>
                    Try selecting a different meal category
                  </Typography>
                </Box>
              ) : (
                <Box className={styles.mealsWrapper}>
                  <Box className={styles.mealsScrollContainer}>
                    {dayKeys.map((mealType, index) => {
                      const meal = currentDayMeals[mealType];
                      const color = mealColors[mealType] || '#e94560';
                      
                      return (
                        <Grow in timeout={(index + 1) * 200} key={mealType}>
                          <Card className={styles.mealCard}>
                            <CardContent className={styles.mealCardContent}>
                              <Box className={styles.mealHeader}>
                                <Box className={styles.mealTypeBadge} style={{ background: color }}>
                                  {mealIcons[mealType]}
                                  <Typography variant="caption" className={styles.mealTypeLabel}>
                                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                                  </Typography>
                                </Box>
                                <Chip
                                  icon={<TimerIcon />}
                                  label={meal.time}
                                  size="small"
                                  className={styles.mealTimeChip}
                                />
                              </Box>

                              <Typography variant="h5" className={styles.mealName}>
                                {meal.name}
                              </Typography>

                              <Box className={styles.mealNutrition}>
                                <Box className={styles.nutritionItem}>
                                  <LocalFireDepartmentIcon className={styles.nutritionIcon} style={{ color: '#e94560' }} />
                                  <Box>
                                    <Typography variant="caption" className={styles.nutritionLabel}>
                                      Calories
                                    </Typography>
                                    <Typography variant="body2" className={styles.nutritionValue}>
                                      {meal.calories}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Divider orientation="vertical" flexItem className={styles.nutritionDivider} />
                                <Box className={styles.nutritionItem}>
                                  <WhatshotIcon className={styles.nutritionIcon} style={{ color: '#4ecdc4' }} />
                                  <Box>
                                    <Typography variant="caption" className={styles.nutritionLabel}>
                                      Protein
                                    </Typography>
                                    <Typography variant="body2" className={styles.nutritionValue}>
                                      {meal.protein}g
                                    </Typography>
                                  </Box>
                                </Box>
                                <Divider orientation="vertical" flexItem className={styles.nutritionDivider} />
                                <Box className={styles.nutritionItem}>
                                  <AppleIcon className={styles.nutritionIcon} style={{ color: '#ffe66d' }} />
                                  <Box>
                                    <Typography variant="caption" className={styles.nutritionLabel}>
                                      Carbs
                                    </Typography>
                                    <Typography variant="body2" className={styles.nutritionValue}>
                                      {meal.carbs}g
                                    </Typography>
                                  </Box>
                                </Box>
                                <Divider orientation="vertical" flexItem className={styles.nutritionDivider} />
                                <Box className={styles.nutritionItem}>
                                  <FastfoodIcon className={styles.nutritionIcon} style={{ color: '#a29bfe' }} />
                                  <Box>
                                    <Typography variant="caption" className={styles.nutritionLabel}>
                                      Fats
                                    </Typography>
                                    <Typography variant="body2" className={styles.nutritionValue}>
                                      {meal.fats}g
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>

                              <Divider className={styles.mealDivider} />

                              <Box className={styles.mealDetails}>
                                <Typography variant="body2" className={styles.mealSubtitle}>
                                  Ingredients
                                </Typography>
                                <Box className={styles.ingredientsList}>
                                  {meal.ingredients.map((ingredient, idx) => (
                                    <Chip
                                      key={idx}
                                      label={ingredient}
                                      size="small"
                                      className={styles.ingredientChip}
                                    />
                                  ))}
                                </Box>
                              </Box>

                              <Box className={styles.mealDetails}>
                                <Typography variant="body2" className={styles.mealSubtitle}>
                                  Instructions
                                </Typography>
                                <Typography variant="body2" className={styles.mealInstructions}>
                                  {meal.instructions}
                                </Typography>
                              </Box>

                              <Button
                                variant="contained"
                                fullWidth
                                className={styles.mealButton}
                                startIcon={<CheckCircleIcon />}
                              >
                                Mark as Complete
                              </Button>
                            </CardContent>
                          </Card>
                        </Grow>
                      );
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tips Section */}
      <Box className={styles.tipsSection}>
        <Container maxWidth="lg">
          <Box className={styles.sectionHeader}>
            <Box className={styles.chipWrapper}>
              <Chip label="TIPS" className={styles.sectionChip} />
            </Box>
            <Typography variant="h2" className={styles.sectionTitle} align="center">
              Healthy Diet
              <span className={styles.sectionHighlight}> Tips</span>
            </Typography>
          </Box>

          <Box className={styles.tipsWrapper}>
            <Box className={styles.tipsScrollContainer}>
              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <WaterDropIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Stay Hydrated
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Drink at least 8 glasses of water daily for optimal health.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <AppleIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Eat Whole Foods
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Focus on unprocessed foods for better nutrition and health.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <TimerIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Eat Mindfully
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Take time to enjoy your meals and listen to your body's signals.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <SelfImprovementIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Plan Ahead
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Meal prep and planning helps you stay on track with your goals.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <EmojiEventsIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Balance is Key
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Enjoy treats in moderation while maintaining a balanced diet.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Fade in>
          <IconButton className={styles.scrollTopButton} onClick={scrollToTop}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Fade>
      )}
    </Box>
  );
};

export default Diet;