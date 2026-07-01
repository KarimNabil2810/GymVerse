import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Fade,
  Zoom,
  Slide,
  Grow,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  Search as SearchIcon,
  PlayArrow as PlayArrowIcon,
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
  Whatshot as WhatshotIcon,
  Timer as TimerIcon,
  Repeat as RepeatIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  DirectionsRun as DirectionsRunIcon,
  SportsGymnastics as SportsGymnasticsIcon,
  DirectionsBike as DirectionsBikeIcon,
  SportsMma as SportsMmaIcon,
  SelfImprovement as SelfImprovementIcon,
  AccessibilityNew as AccessibilityNewIcon,
  MonitorWeight as MonitorWeightIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styles from './Workouts.module.css';

const Workouts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Check if dark mode is active
  const isDarkMode = theme.palette.mode === 'dark';

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

  const categories = [
    { id: 'all', label: 'All Workouts', icon: <FitnessCenterIcon /> },
    { id: 'cardio', label: 'Cardio', icon: <DirectionsRunIcon /> },
    { id: 'strength', label: 'Strength', icon: <SportsGymnasticsIcon /> },
    { id: 'yoga', label: 'Yoga & Flexibility', icon: <SelfImprovementIcon /> },
    { id: 'hiit', label: 'HIIT', icon: <WhatshotIcon /> },
    { id: 'cycling', label: 'Cycling', icon: <DirectionsBikeIcon /> },
    { id: 'martial', label: 'Martial Arts', icon: <SportsMmaIcon /> },
  ];

  const workouts = [
    {
      id: 1,
      title: 'Full Body HIIT',
      category: 'hiit',
      difficulty: 'Advanced',
      duration: '45 min',
      calories: '400-500',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
      exercises: 12,
      description: 'High-intensity interval training targeting all major muscle groups.',
      popular: true,
      equipment: ['Dumbbells', 'Mat', 'Water'],
    },
    {
      id: 2,
      title: 'Morning Yoga Flow',
      category: 'yoga',
      difficulty: 'Beginner',
      duration: '30 min',
      calories: '200-300',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      exercises: 15,
      description: 'Gentle yoga sequence to energize your body and mind.',
      popular: false,
      equipment: ['Yoga Mat'],
    },
    {
      id: 3,
      title: 'Upper Body Strength',
      category: 'strength',
      difficulty: 'Intermediate',
      duration: '60 min',
      calories: '300-400',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      exercises: 10,
      description: 'Focus on building upper body strength and muscle definition.',
      popular: true,
      equipment: ['Dumbbells', 'Bench', 'Pull-up Bar'],
    },
    {
      id: 4,
      title: 'Cardio Blast',
      category: 'cardio',
      difficulty: 'Intermediate',
      duration: '40 min',
      calories: '350-450',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      exercises: 8,
      description: 'High-energy cardio workout to boost your heart rate.',
      popular: false,
      equipment: ['Shoes', 'Water'],
    },
    {
      id: 5,
      title: 'Power Cycling',
      category: 'cycling',
      difficulty: 'Advanced',
      duration: '50 min',
      calories: '500-600',
      image: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=400',
      exercises: 6,
      description: 'Intense cycling workout for leg strength and endurance.',
      popular: false,
      equipment: ['Stationary Bike'],
    },
    {
      id: 6,
      title: 'Kickboxing Fundamentals',
      category: 'martial',
      difficulty: 'Beginner',
      duration: '35 min',
      calories: '300-400',
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400',
      exercises: 14,
      description: 'Learn basic kickboxing techniques with cardio benefits.',
      popular: false,
      equipment: ['Gloves', 'Pads'],
    },
    {
      id: 7,
      title: 'Core Crusher',
      category: 'strength',
      difficulty: 'Intermediate',
      duration: '25 min',
      calories: '250-350',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
      exercises: 10,
      description: 'Intense core workout for six-pack abs and stability.',
      popular: false,
      equipment: ['Mat'],
    },
    {
      id: 8,
      title: 'Relaxation & Stretch',
      category: 'yoga',
      difficulty: 'Beginner',
      duration: '20 min',
      calories: '100-150',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400',
      exercises: 18,
      description: 'Deep stretching routine for relaxation and flexibility.',
      popular: false,
      equipment: ['Yoga Mat', 'Block'],
    },
    {
      id: 9,
      title: 'Tabata Sprint',
      category: 'hiit',
      difficulty: 'Advanced',
      duration: '20 min',
      calories: '300-400',
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400',
      exercises: 8,
      description: 'High-intensity Tabata intervals for maximum calorie burn.',
      popular: true,
      equipment: ['Shoes', 'Water'],
    },
    {
      id: 10,
      title: 'Beginner Cardio',
      category: 'cardio',
      difficulty: 'Beginner',
      duration: '30 min',
      calories: '200-300',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400',
      exercises: 10,
      description: 'Low-impact cardio perfect for beginners.',
      popular: false,
      equipment: ['Shoes', 'Water'],
    },
  ];

  const handleFavoriteToggle = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleBookmarkToggle = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(book => book !== id) : [...prev, id]
    );
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesCategory = selectedCategory === 'all' || workout.category === selectedCategory;
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return '#4ecdc4';
      case 'intermediate': return '#ffe66d';
      case 'advanced': return '#e94560';
      default: return '#a29bfe';
    }
  };

  return (
    <Box className={`${styles.workoutsContainer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      {/* Hero Section */}
      <Box className={styles.heroSection}>
        <Container maxWidth="lg">
          <Box className={styles.heroContent}>
            <Fade in timeout={1000}>
              <Box className={styles.heroTextContainer}>
                <Box className={styles.chipWrapper}>
                  <Chip
                    label="WORKOUTS"
                    className={styles.heroChip}
                    icon={<FitnessCenterIcon />}
                  />
                </Box>
                <Typography variant="h1" className={styles.heroTitle} align="center">
                  Find Your
                  <span className={styles.heroHighlight}> Perfect Workout</span>
                </Typography>
                <Typography variant="body1" className={styles.heroSubtitle} align="center">
                  Discover hundreds of exercises and workout routines tailored to your
                  fitness level and goals. Start your journey today!
                </Typography>
                <Box className={styles.searchContainer}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search workouts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon className={styles.searchIcon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Fade>
          </Box>
        </Container>
        <IconButton
          className={styles.scrollDownButton}
          onClick={() => document.getElementById('workouts-grid').scrollIntoView({ behavior: 'smooth' })}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      {/* Categories Tabs */}
      <Box className={styles.categoriesSection}>
        <Container maxWidth="lg">
          <Box className={styles.categoriesWrapper}>
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              className={styles.categoriesTabs}
              TabIndicatorProps={{
                className: styles.tabIndicator,
              }}
              centered
            >
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  value={category.id}
                  label={
                    <Box className={styles.tabLabel}>
                      {category.icon}
                      <Typography variant="body2" className={styles.tabText}>
                        {category.label}
                      </Typography>
                    </Box>
                  }
                  className={styles.categoryTab}
                />
              ))}
            </Tabs>
          </Box>
        </Container>
      </Box>

      {/* Workouts Grid - Scrollable on mobile */}
      <Box id="workouts-grid" className={styles.workoutsGridSection}>
        <Container maxWidth="lg">
          <Box className={styles.gridHeader}>
            <Box className={styles.gridHeaderLeft}>
              <Typography variant="h5" className={styles.gridTitle}>
                {filteredWorkouts.length} Workouts Available
              </Typography>
              <Typography variant="body2" className={styles.gridSubtitle}>
                Find the perfect workout for your fitness journey
              </Typography>
            </Box>
          </Box>

          {filteredWorkouts.length === 0 ? (
            <Box className={styles.noResults}>
              <FitnessCenterIcon className={styles.noResultsIcon} />
              <Typography variant="h5" className={styles.noResultsTitle}>
                No workouts found
              </Typography>
              <Typography variant="body2" className={styles.noResultsSubtitle}>
                Try adjusting your search or filter criteria
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className={styles.clearFiltersButton}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            <Box className={styles.workoutsWrapper}>
              <Box className={styles.workoutsScrollContainer}>
                {filteredWorkouts.map((workout, index) => (
                  <Zoom in timeout={(index + 1) * 100} key={workout.id}>
                    <Card className={styles.workoutCard}>
                      <Box className={styles.cardImageContainer}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={workout.image}
                          alt={workout.title}
                          className={styles.cardImage}
                        />
                        <Box className={styles.cardBadges}>
                          {workout.popular && (
                            <Chip
                              label="Popular"
                              icon={<TrendingUpIcon />}
                              className={styles.popularBadge}
                            />
                          )}
                          <Chip
                            label={workout.difficulty}
                            className={styles.difficultyBadge}
                            style={{ backgroundColor: getDifficultyColor(workout.difficulty) }}
                          />
                        </Box>
                        <Box className={styles.cardActions}>
                          <IconButton
                            className={styles.actionButton}
                            onClick={() => handleFavoriteToggle(workout.id)}
                          >
                            {favorites.includes(workout.id) ? (
                              <FavoriteIcon className={styles.favoriteActive} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                          <IconButton
                            className={styles.actionButton}
                            onClick={() => handleBookmarkToggle(workout.id)}
                          >
                            {bookmarks.includes(workout.id) ? (
                              <BookmarkIcon className={styles.bookmarkActive} />
                            ) : (
                              <BookmarkBorderIcon />
                            )}
                          </IconButton>
                        </Box>
                      </Box>
                      <CardContent className={styles.cardContent}>
                        <Typography variant="h6" className={styles.workoutTitle}>
                          {workout.title}
                        </Typography>
                        <Typography variant="body2" className={styles.workoutDescription}>
                          {workout.description}
                        </Typography>
                        <Box className={styles.workoutStats}>
                          <Box className={styles.statItem}>
                            <TimerIcon className={styles.statIcon} />
                            <Typography variant="caption">{workout.duration}</Typography>
                          </Box>
                          <Box className={styles.statItem}>
                            <WhatshotIcon className={styles.statIcon} />
                            <Typography variant="caption">{workout.calories} kcal</Typography>
                          </Box>
                          <Box className={styles.statItem}>
                            <RepeatIcon className={styles.statIcon} />
                            <Typography variant="caption">{workout.exercises} exercises</Typography>
                          </Box>
                        </Box>
                        <Box className={styles.equipmentContainer}>
                          {workout.equipment.map((item, idx) => (
                            <Chip
                              key={idx}
                              label={item}
                              size="small"
                              className={styles.equipmentChip}
                            />
                          ))}
                        </Box>
                        <Button
                          variant="contained"
                          fullWidth
                          className={styles.startButton}
                          endIcon={<PlayArrowIcon />}
                          onClick={() => setSelectedWorkout(workout.id)}
                        >
                          Start Workout
                        </Button>
                      </CardContent>
                    </Card>
                  </Zoom>
                ))}
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      {/* Featured Workout Section - Centered without image */}
      <Box className={styles.featuredSection}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box className={styles.featuredContent}>
              <Box className={styles.chipWrapper}>
                <Chip
                  label="FEATURED"
                  className={styles.featuredChip}
                  icon={<EmojiEventsIcon />}
                />
              </Box>
              <Typography variant="h3" className={styles.featuredTitle} align="center">
                Workout of the Week
              </Typography>
              <Typography variant="h4" className={styles.featuredSubtitle} align="center">
                Full Body HIIT
              </Typography>
              <Typography variant="body1" className={styles.featuredDescription} align="center">
                This high-intensity interval training workout is designed to
                maximize calorie burn and build strength in just 45 minutes.
                Perfect for all fitness levels with modifications available.
              </Typography>
              <Box className={styles.featuredStats}>
                <Box className={styles.featuredStat}>
                  <TimerIcon className={styles.featuredStatIcon} />
                  <Typography variant="body2">45 min</Typography>
                </Box>
                <Box className={styles.featuredStat}>
                  <WhatshotIcon className={styles.featuredStatIcon} />
                  <Typography variant="body2">400-500 kcal</Typography>
                </Box>
                <Box className={styles.featuredStat}>
                  <AccessibilityNewIcon className={styles.featuredStatIcon} />
                  <Typography variant="body2">12 exercises</Typography>
                </Box>
              </Box>
              <Box className={styles.featuredButtonWrapper}>
                <Button
                  variant="contained"
                  size="large"
                  className={styles.featuredButton}
                  endIcon={<PlayArrowIcon />}
                >
                  Start Now
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Tips Section - Scrollable in one line */}
      <Box className={styles.tipsSection}>
        <Container maxWidth="lg">
          <Box className={styles.sectionHeader}>
            <Box className={styles.chipWrapper}>
              <Chip label="TIPS" className={styles.sectionChip} />
            </Box>
            <Typography variant="h2" className={styles.sectionTitle} align="center">
              Workout
              <span className={styles.sectionHighlight}> Tips</span>
            </Typography>
          </Box>

          <Box className={styles.tipsWrapper}>
            <Box className={styles.tipsScrollContainer}>
              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <AccessTimeIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Warm Up Properly
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Always start with 5-10 minutes of light cardio and dynamic stretching.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <MonitorWeightIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Progressive Overload
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Gradually increase weight or intensity to continue making progress.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <RestaurantIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Stay Hydrated
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Drink water before, during, and after your workout for optimal performance.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <AccessTimeIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Rest & Recovery
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Allow 48 hours between strength training sessions for muscle recovery.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <WhatshotIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Mix It Up
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Vary your workouts to prevent boredom and target different muscle groups.
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

export default Workouts;