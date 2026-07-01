import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Slide,
  Grow,
  Chip,
  Stack,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  FitnessCenter as FitnessCenterIcon,
  Restaurant as RestaurantIcon,
  MonitorWeight as MonitorWeightIcon,
  Calculate as CalculateIcon,
  ArrowForward as ArrowForwardIcon,
  EmojiEvents as EmojiEventsIcon,
  Group as GroupIcon,
  Bolt as BoltIcon,
  SelfImprovement as SelfImprovementIcon,
  Schedule as ScheduleIcon,
  MenuBook as MenuBookIcon,
  PlayArrow as PlayArrowIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import styles from './Home.module.css';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeStat, setActiveStat] = useState(null);

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

  const features = [
    {
      icon: <FitnessCenterIcon className={styles.featureIcon} />,
      title: 'Workout Library',
      description: 'Access hundreds of exercises with video guides and detailed instructions.',
      link: '/workouts',
      color: '#a29bfe',
    },
    {
      icon: <CalculateIcon className={styles.featureIcon} />,
      title: 'Calories Calculator',
      description: 'Track your daily caloric intake and reach your fitness goals with precision.',
      link: '/calories',
      color: '#e94560',
    },
    {
      icon: <MonitorWeightIcon className={styles.featureIcon} />,
      title: 'Weight Tracking',
      description: 'Monitor your weight journey with detailed analytics and progress charts.',
      link: '/weight',
      color: '#4ecdc4',
    },
    {
      icon: <RestaurantIcon className={styles.featureIcon} />,
      title: 'Diet Plan',
      description: 'Get custom meal plans tailored to your body type and fitness objectives.',
      link: '/diet',
      color: '#ffe66d',
    },
  ];

  const stats = [
    {
      value: '10K+',
      label: 'Active Users',
      icon: <GroupIcon />,
      description: 'Growing community',
    },
    {
      value: '500+',
      label: 'Workouts',
      icon: <FitnessCenterIcon />,
      description: 'Exercises for all',
    },
    {
      value: '95%',
      label: 'Success Rate',
      icon: <EmojiEventsIcon />,
      description: 'Goals achieved',
    },
    {
      value: '24/7',
      label: 'Support',
      icon: <ScheduleIcon />,
      description: 'Always available',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'GymVerse transformed my fitness journey. The personalized diet plans and workout tracking made all the difference!',
      rating: 5,
    },
    {
      name: 'Mike Thompson',
      role: 'Professional Athlete',
      avatar: 'https://i.pravatar.cc/150?img=2',
      text: 'The calorie calculator is incredibly accurate. I\'ve never had such precise control over my nutrition.',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Yoga Instructor',
      avatar: 'https://i.pravatar.cc/150?img=3',
      text: 'I love how intuitive the weight tracking feature is. It keeps me motivated to reach my goals every day.',
      rating: 5,
    },
  ];

  const benefits = [
    {
      icon: <BoltIcon className={styles.benefitIcon} />,
      title: 'Energy Boost',
      description: 'Increase your daily energy levels with optimized workout routines.',
    },
    {
      icon: <SelfImprovementIcon className={styles.benefitIcon} />,
      title: 'Better Health',
      description: 'Improve overall health and wellness with balanced nutrition plans.',
    },
    {
      icon: <MenuBookIcon className={styles.benefitIcon} />,
      title: 'Expert Guidance',
      description: 'Learn from professional trainers and nutritionists through our platform.',
    },
  ];

  // Check if dark mode is active
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box className={`${styles.homeContainer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      {/* Hero Section */}
      <Box className={styles.heroSection}>
        <Container maxWidth="lg">
          <Box className={styles.heroContent}>
            <Fade in timeout={1000}>
              <Box className={styles.heroTextContainer}>
                <Box className={styles.chipWrapper}>
                  <Chip
                    label="NEW"
                    className={styles.heroChip}
                    icon={<BoltIcon />}
                  />
                </Box>
                <Typography variant="h1" className={styles.heroTitle} align="center">
                  Transform Your
                  <span className={styles.heroHighlight}> Fitness</span>
                  <br />
                  <span className={styles.heroHighlight}>Journey</span>
                </Typography>
                <Typography variant="body1" className={styles.heroSubtitle} align="center">
                  Join GymVerse and revolutionize your fitness experience with
                  personalized workouts, nutrition plans, and real-time tracking.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  className={styles.heroButtons}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    component={Link}
                    to="/workouts"
                    variant="contained"
                    size="large"
                    className={styles.primaryButton}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    className={styles.secondaryButton}
                    startIcon={<PlayArrowIcon />}
                  >
                    Watch Demo
                  </Button>
                </Stack>
                <Box className={styles.heroStats}>
                  <Box className={styles.heroStat}>
                    <Typography variant="h4" className={styles.heroStatValue}>
                      10K+
                    </Typography>
                    <Typography variant="caption" className={styles.heroStatLabel}>
                      Active Users
                    </Typography>
                  </Box>
                  <Box className={styles.heroStatDivider} />
                  <Box className={styles.heroStat}>
                    <Typography variant="h4" className={styles.heroStatValue}>
                      500+
                    </Typography>
                    <Typography variant="caption" className={styles.heroStatLabel}>
                      Workouts
                    </Typography>
                  </Box>
                  <Box className={styles.heroStatDivider} />
                  <Box className={styles.heroStat}>
                    <Typography variant="h4" className={styles.heroStatValue}>
                      95%
                    </Typography>
                    <Typography variant="caption" className={styles.heroStatLabel}>
                      Success Rate
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Box>
        </Container>
        <IconButton
          className={styles.scrollDownButton}
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      {/* Benefits Bar - Scrollable on mobile */}
      <Box className={styles.benefitsBar}>
        <Container maxWidth="lg">
          <Box className={styles.benefitsWrapper}>
            <Box className={styles.benefitsScrollContainer}>
              {benefits.map((benefit, index) => (
                <Grow in timeout={(index + 1) * 300} key={index}>
                  <Box className={styles.benefitItem}>
                    {benefit.icon}
                    <Typography variant="h6" className={styles.benefitTitle}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" className={styles.benefitDescription}>
                      {benefit.description}
                    </Typography>
                  </Box>
                </Grow>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section - Scrollable on mobile */}
      <Box id="features" className={styles.featuresSection}>
        <Container maxWidth="lg">
          <Box className={styles.sectionHeader}>
            <Box className={styles.chipWrapper}>
              <Chip label="Features" className={styles.sectionChip} />
            </Box>
            <Typography variant="h2" className={styles.sectionTitle} align="center">
              Everything You Need to
              <span className={styles.sectionHighlight}> Succeed</span>
            </Typography>
            <Typography variant="body1" className={styles.sectionSubtitle} align="center">
              Discover our comprehensive suite of fitness tools designed to help you
              achieve your health and wellness goals.
            </Typography>
          </Box>

          <Box className={styles.featuresWrapper}>
            <Box className={styles.featuresScrollContainer}>
              {features.map((feature, index) => (
                <Zoom in timeout={(index + 1) * 200} key={index}>
                  <Card className={styles.featureCard} style={{ '--feature-color': feature.color }}>
                    <CardContent className={styles.featureCardContent}>
                      <Box className={styles.featureIconContainer} style={{ background: `${feature.color}20` }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" className={styles.featureTitle}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" className={styles.featureDescription}>
                        {feature.description}
                      </Typography>
                      <Button
                        component={Link}
                        to={feature.link}
                        className={styles.featureButton}
                        endIcon={<ArrowForwardIcon />}
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </Zoom>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section - Scrollable on mobile */}
      <Box className={styles.statsSection}>
        <Container maxWidth="lg">
          <Box className={styles.statsWrapper}>
            <Box className={styles.statsScrollContainer}>
              {stats.map((stat, index) => (
                <Fade in timeout={(index + 1) * 300} key={index}>
                  <Paper
                    className={styles.statCard}
                    onMouseEnter={() => setActiveStat(index)}
                    onMouseLeave={() => setActiveStat(null)}
                    elevation={activeStat === index ? 8 : 2}
                  >
                    <Box className={styles.statIconContainer}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" className={styles.statValue}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" className={styles.statLabel}>
                      {stat.label}
                    </Typography>
                    <Typography variant="caption" className={styles.statDescription}>
                      {stat.description}
                    </Typography>
                    {activeStat === index && (
                      <Box className={styles.statProgress}>
                        <Box className={styles.statProgressBar} />
                      </Box>
                    )}
                  </Paper>
                </Fade>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section - Scrollable on mobile */}
      <Box className={styles.testimonialsSection}>
        <Container maxWidth="lg">
          <Box className={styles.sectionHeader}>
            <Box className={styles.chipWrapper}>
              <Chip label="Testimonials" className={styles.sectionChip} />
            </Box>
            <Typography variant="h2" className={styles.sectionTitle} align="center">
              What Our
              <span className={styles.sectionHighlight}> Users Say</span>
            </Typography>
          </Box>

          <Box className={styles.testimonialsWrapper}>
            <Box className={styles.testimonialsScrollContainer}>
              {testimonials.map((testimonial, index) => (
                <Slide in timeout={(index + 1) * 300} direction="up" key={index}>
                  <Card className={styles.testimonialCard}>
                    <CardContent className={styles.testimonialCardContent}>
                      <Box className={styles.testimonialHeader}>
                        <Avatar src={testimonial.avatar} className={styles.testimonialAvatar} />
                        <Box>
                          <Typography variant="h6" className={styles.testimonialName}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="caption" className={styles.testimonialRole}>
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" className={styles.testimonialText}>
                        "{testimonial.text}"
                      </Typography>
                      <Box className={styles.testimonialRating}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className={styles.starIcon}>★</span>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Slide>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className={styles.ctaSection}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box className={styles.ctaContent}>
              <Typography variant="h2" className={styles.ctaTitle} align="center">
                Ready to Start Your
                <span className={styles.ctaHighlight}> Fitness Journey?</span>
              </Typography>
              <Typography variant="body1" className={styles.ctaSubtitle} align="center">
                Join thousands of users who have transformed their lives with GymVerse.
                Get started today for free!
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3} 
                justifyContent="center"
                alignItems="center"
                className={styles.ctaButtons}
              >
                <Button
                  component={Link}
                  to="/workouts"
                  variant="contained"
                  size="large"
                  className={styles.ctaPrimaryButton}
                  endIcon={<ArrowForwardIcon />}
                >
                  Get Started Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className={styles.ctaSecondaryButton}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
          </Fade>
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

export default Home;