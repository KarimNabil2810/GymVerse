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
  TextField,
  InputAdornment,
  Fade,
  Zoom,
  Slide,
  Grow,
  Paper,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  Calculate as CalculateIcon,
  Restaurant as RestaurantIcon,
  MonitorWeight as MonitorWeightIcon,
  Whatshot as WhatshotIcon,
  Timer as TimerIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
  DirectionsRun as DirectionsRunIcon,
  SelfImprovement as SelfImprovementIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  WaterDrop as WaterDropIcon,
  Bedtime as BedtimeIcon,
  Apple as AppleIcon,
  Fastfood as FastfoodIcon,
  FitnessCenter as FitnessCenterOutlinedIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  ErrorOutlined as ErrorOutlineIcon,
} from '@mui/icons-material';
import styles from './Calories.module.css';

const Calories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isDarkMode = theme.palette.mode === 'dark';

  // Form state
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState(null);
  const [calculated, setCalculated] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalErrors, setModalErrors] = useState([]);

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

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
    { value: 'light', label: 'Lightly Active', multiplier: 1.375, description: 'Exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderately Active', multiplier: 1.55, description: 'Exercise 3-5 days/week' },
    { value: 'active', label: 'Very Active', multiplier: 1.725, description: 'Exercise 6-7 days/week' },
    { value: 'extra', label: 'Extra Active', multiplier: 1.9, description: 'Athlete or physical job' },
  ];

  const goals = [
    { value: 'lose', label: 'Lose Weight', icon: <WhatshotIcon />, deficit: 500 },
    { value: 'maintain', label: 'Maintain Weight', icon: <MonitorWeightIcon />, deficit: 0 },
    { value: 'gain', label: 'Gain Weight', icon: <TrendingUpIcon />, deficit: -500 },
  ];

  const validateForm = () => {
    const errors = [];
    
    if (!age || age.trim() === '') {
      errors.push('Age is required');
    } else if (parseInt(age) < 0) {
      errors.push('Age cannot be negative');
    } else if (parseInt(age) < 10) {
      errors.push('Age must be at least 10 years');
    } else if (parseInt(age) > 120) {
      errors.push('Age must be less than 120 years');
    }

    if (!weight || weight.trim() === '') {
      errors.push('Weight is required');
    } else if (parseFloat(weight) < 0) {
      errors.push('Weight cannot be negative');
    } else if (parseFloat(weight) < 20) {
      errors.push('Weight must be at least 20 kg');
    } else if (parseFloat(weight) > 300) {
      errors.push('Weight must be less than 300 kg');
    }

    if (!height || height.trim() === '') {
      errors.push('Height is required');
    } else if (parseFloat(height) < 0) {
      errors.push('Height cannot be negative');
    } else if (parseFloat(height) < 50) {
      errors.push('Height must be at least 50 cm');
    } else if (parseFloat(height) > 250) {
      errors.push('Height must be less than 250 cm');
    }

    return errors;
  };

  const calculateCalories = () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      setModalErrors(errors);
      setModalOpen(true);
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Get activity multiplier
    const activity = activityLevels.find(a => a.value === activityLevel);
    const tdee = bmr * activity.multiplier;

    // Adjust for goal
    const goalData = goals.find(g => g.value === goal);
    const adjustedCalories = tdee - goalData.deficit;

    // Calculate macros
    const protein = Math.round((adjustedCalories * 0.30) / 4);
    const carbs = Math.round((adjustedCalories * 0.40) / 4);
    const fats = Math.round((adjustedCalories * 0.30) / 9);

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(adjustedCalories),
      protein,
      carbs,
      fats,
      goal: goalData.label,
      deficit: goalData.deficit,
      activity: activity.label,
      water: Math.round(weightNum * 0.033),
      sleep: '7-9',
    });
    setCalculated(true);

    // Scroll to results on mobile
    if (isMobile) {
      setTimeout(() => {
        document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const resetForm = () => {
    setGender('male');
    setAge('');
    setWeight('');
    setHeight('');
    setActivityLevel('moderate');
    setGoal('maintain');
    setResult(null);
    setCalculated(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalErrors([]);
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === '' || parseFloat(value) >= 0) {
      setAge(value);
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || parseFloat(value) >= 0) {
      setWeight(value);
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || parseFloat(value) >= 0) {
      setHeight(value);
    }
  };

  return (
    <Box className={`${styles.caloriesContainer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      {/* Hero Section */}
      <Box className={styles.heroSection}>
        <Container maxWidth="lg">
          <Box className={styles.heroContent}>
            <Fade in timeout={1000}>
              <Box className={styles.heroTextContainer}>
                <Box className={styles.chipWrapper}>
                  <Chip
                    label="CALCULATOR"
                    className={styles.heroChip}
                    icon={<CalculateIcon />}
                  />
                </Box>
                <Typography variant="h1" className={styles.heroTitle} align="center">
                  Calculate Your
                  <span className={styles.heroHighlight}> Daily Calories</span>
                </Typography>
                <Typography variant="body1" className={styles.heroSubtitle} align="center">
                  Get your personalized daily calorie and macronutrient recommendations
                  based on your body metrics and fitness goals.
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Container>
        <IconButton
          className={styles.scrollDownButton}
          onClick={() => document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' })}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      {/* Calculator Section - Flex Container */}
      <Box id="calculator" className={styles.calculatorSection}>
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box className={styles.calculatorWrapper}>
              <Box className={styles.calculatorFlex}>
                {/* Form Column */}
                <Box className={styles.formColumn}>
                  <Paper className={styles.calculatorForm}>
                    <Typography variant="h5" className={styles.formTitle} align="center">
                      Enter Your Details
                    </Typography>
                    <Divider className={styles.formDivider} />

                    {/* Gender Selection */}
                    <Box className={styles.formGroup}>
                      <Typography variant="body2" className={styles.formLabel} align="center">
                        Gender
                      </Typography>
                      <Box className={styles.genderButtons}>
                        <Button
                          variant={gender === 'male' ? 'contained' : 'outlined'}
                          onClick={() => setGender('male')}
                          className={`${styles.genderButton} ${gender === 'male' ? styles.genderActive : ''}`}
                          startIcon={<MaleIcon />}
                          fullWidth
                        >
                          Male
                        </Button>
                        <Button
                          variant={gender === 'female' ? 'contained' : 'outlined'}
                          onClick={() => setGender('female')}
                          className={`${styles.genderButton} ${gender === 'female' ? styles.genderActive : ''}`}
                          startIcon={<FemaleIcon />}
                          fullWidth
                        >
                          Female
                        </Button>
                      </Box>
                    </Box>

                    {/* Age */}
                    <Box className={styles.formGroup}>
                      <Typography variant="body2" className={styles.formLabel}>
                        Age (years)
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={age}
                        onChange={handleAgeChange}
                        placeholder="Enter your age"
                        className={styles.formInput}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TimerIcon className={styles.inputIcon} />
                            </InputAdornment>
                          ),
                          inputProps: { 
                            min: 0,
                            step: 1,
                          },
                        }}
                      />
                    </Box>

                    {/* Weight */}
                    <Box className={styles.formGroup}>
                      <Typography variant="body2" className={styles.formLabel}>
                        Weight (kg)
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        placeholder="Enter your weight"
                        className={styles.formInput}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MonitorWeightIcon className={styles.inputIcon} />
                            </InputAdornment>
                          ),
                          inputProps: { 
                            min: 0,
                            step: 0.1,
                          },
                        }}
                      />
                    </Box>

                    {/* Height */}
                    <Box className={styles.formGroup}>
                      <Typography variant="body2" className={styles.formLabel}>
                        Height (cm)
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        placeholder="Enter your height"
                        className={styles.formInput}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FitnessCenterOutlinedIcon className={styles.inputIcon} />
                            </InputAdornment>
                          ),
                          inputProps: { 
                            min: 0,
                            step: 0.1,
                          },
                        }}
                      />
                    </Box>

                    {/* Activity Level */}
                    <Box className={styles.formGroup}>
                      <Typography variant="body2" className={styles.formLabel}>
                        Activity Level
                      </Typography>
                      <FormControl fullWidth className={styles.formControl}>
                        <Select
                          value={activityLevel}
                          onChange={(e) => setActivityLevel(e.target.value)}
                          className={styles.selectInput}
                        >
                          {activityLevels.map((level) => (
                            <MenuItem key={level.value} value={level.value}>
                              <Box>
                                <Typography variant="body2">{level.label}</Typography>
                                <Typography variant="caption" className={styles.selectDescription}>
                                  {level.description}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Goal */}
                    <Box className={styles.formGroup}>
                      <Typography variant="body2" className={styles.formLabel}>
                        Fitness Goal
                      </Typography>
                      <Box className={styles.goalButtons}>
                        {goals.map((g) => (
                          <Button
                            key={g.value}
                            variant={goal === g.value ? 'contained' : 'outlined'}
                            onClick={() => setGoal(g.value)}
                            className={`${styles.goalButton} ${goal === g.value ? styles.goalActive : ''}`}
                            startIcon={g.icon}
                            fullWidth
                          >
                            {g.label}
                          </Button>
                        ))}
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className={styles.actionButtons}>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        className={styles.calculateButton}
                        onClick={calculateCalories}
                        startIcon={<CalculateIcon />}
                      >
                        Calculate
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        className={styles.resetButton}
                        onClick={resetForm}
                      >
                        Reset
                      </Button>
                    </Stack>
                  </Paper>
                </Box>

                {/* Results Column */}
                <Box id="results-section" className={styles.resultsColumn}>
                  <Paper className={styles.resultsContainer}>
                    {!calculated ? (
                      <Box className={styles.resultsPlaceholder}>
                        <CalculateIcon className={styles.placeholderIcon} />
                        <Typography variant="h5" className={styles.placeholderTitle} align="center">
                          Your Results Will Appear Here
                        </Typography>
                        <Typography variant="body2" className={styles.placeholderSubtitle} align="center">
                          Fill in your details and click "Calculate" to get your
                          personalized calorie and nutrition recommendations.
                        </Typography>
                      </Box>
                    ) : (
                      <Box className={styles.resultsContent}>
                        <Box className={styles.resultsHeader}>
                          <Chip
                            label="RESULTS"
                            className={styles.resultsChip}
                            icon={<EmojiEventsIcon />}
                          />
                          <Typography variant="h5" className={styles.resultsTitle} align="center">
                            Your Daily Plan
                          </Typography>
                        </Box>

                        {/* Main Calorie Result */}
                        <Box className={styles.calorieResult}>
                          <Box className={styles.calorieNumber}>
                            <Typography variant="h2" className={styles.calorieValue} align="center">
                              {result.calories}
                            </Typography>
                            <Typography variant="body2" className={styles.calorieLabel} align="center">
                              calories per day
                            </Typography>
                          </Box>
                          <Box className={styles.calorieGoal}>
                            <Chip
                              label={result.goal}
                              className={styles.goalResultChip}
                              icon={goal === 'lose' ? <WhatshotIcon /> : goal === 'gain' ? <TrendingUpIcon /> : <MonitorWeightIcon />}
                            />
                          </Box>
                        </Box>

                        <Divider className={styles.resultsDivider} />

                        {/* BMR & TDEE */}
                        <Box className={styles.statsFlex}>
                          <Box className={styles.statsFlexItem}>
                            <Box className={styles.resultStat}>
                              <Typography variant="caption" className={styles.resultStatLabel} align="center">
                                BMR
                              </Typography>
                              <Typography variant="h6" className={styles.resultStatValue} align="center">
                                {result.bmr}
                              </Typography>
                              <Typography variant="caption" className={styles.resultStatSub} align="center">
                                kcal/day
                              </Typography>
                            </Box>
                          </Box>
                          <Box className={styles.statsFlexItem}>
                            <Box className={styles.resultStat}>
                              <Typography variant="caption" className={styles.resultStatLabel} align="center">
                                TDEE
                              </Typography>
                              <Typography variant="h6" className={styles.resultStatValue} align="center">
                                {result.tdee}
                              </Typography>
                              <Typography variant="caption" className={styles.resultStatSub} align="center">
                                kcal/day
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Divider className={styles.resultsDivider} />

                        {/* Macros */}
                        <Box className={styles.macrosSection}>
                          <Typography variant="h6" className={styles.macrosTitle} align="center">
                            Macronutrients
                          </Typography>
                          <Box className={styles.macrosFlex}>
                            <Box className={styles.macrosFlexItem}>
                              <Box className={styles.macroItem}>
                                <Box className={styles.macroIcon} style={{ background: 'rgba(233, 69, 96, 0.1)' }}>
                                  <LocalFireDepartmentIcon style={{ color: '#e94560' }} />
                                </Box>
                                <Typography variant="h6" className={styles.macroValue} align="center">
                                  {result.protein}g
                                </Typography>
                                <Typography variant="caption" className={styles.macroLabel} align="center">
                                  Protein
                                </Typography>
                                <Typography variant="caption" className={styles.macroPercent} align="center">
                                  {Math.round((result.protein * 4 / result.calories) * 100)}%
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.round((result.protein * 4 / result.calories) * 100)}
                                  className={styles.macroProgress}
                                  sx={{
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: '#e94560',
                                    },
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box className={styles.macrosFlexItem}>
                              <Box className={styles.macroItem}>
                                <Box className={styles.macroIcon} style={{ background: 'rgba(78, 205, 196, 0.1)' }}>
                                  <AppleIcon style={{ color: '#4ecdc4' }} />
                                </Box>
                                <Typography variant="h6" className={styles.macroValue} align="center">
                                  {result.carbs}g
                                </Typography>
                                <Typography variant="caption" className={styles.macroLabel} align="center">
                                  Carbs
                                </Typography>
                                <Typography variant="caption" className={styles.macroPercent} align="center">
                                  {Math.round((result.carbs * 4 / result.calories) * 100)}%
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.round((result.carbs * 4 / result.calories) * 100)}
                                  className={styles.macroProgress}
                                  sx={{
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: '#4ecdc4',
                                    },
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box className={styles.macrosFlexItem}>
                              <Box className={styles.macroItem}>
                                <Box className={styles.macroIcon} style={{ background: 'rgba(255, 230, 109, 0.1)' }}>
                                  <FastfoodIcon style={{ color: '#ffe66d' }} />
                                </Box>
                                <Typography variant="h6" className={styles.macroValue} align="center">
                                  {result.fats}g
                                </Typography>
                                <Typography variant="caption" className={styles.macroLabel} align="center">
                                  Fats
                                </Typography>
                                <Typography variant="caption" className={styles.macroPercent} align="center">
                                  {Math.round((result.fats * 9 / result.calories) * 100)}%
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.round((result.fats * 9 / result.calories) * 100)}
                                  className={styles.macroProgress}
                                  sx={{
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: '#ffe66d',
                                    },
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Divider className={styles.resultsDivider} />

                        {/* Additional Stats */}
                        <Box className={styles.additionalStats}>
                          <Box className={styles.additionalStatsFlex}>
                            <Box className={styles.additionalStatsFlexItem}>
                              <Box className={styles.additionalStat}>
                                <WaterDropIcon className={styles.additionalStatIcon} />
                                <Box>
                                  <Typography variant="caption" className={styles.additionalStatLabel}>
                                    Water Intake
                                  </Typography>
                                  <Typography variant="body2" className={styles.additionalStatValue}>
                                    {result.water}L
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className={styles.additionalStatsFlexItem}>
                              <Box className={styles.additionalStat}>
                                <BedtimeIcon className={styles.additionalStatIcon} />
                                <Box>
                                  <Typography variant="caption" className={styles.additionalStatLabel}>
                                    Sleep
                                  </Typography>
                                  <Typography variant="body2" className={styles.additionalStatValue}>
                                    {result.sleep} hours
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Fade>
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
              Calorie
              <span className={styles.sectionHighlight}> Management Tips</span>
            </Typography>
          </Box>

          <Box className={styles.tipsWrapper}>
            <Box className={styles.tipsScrollContainer}>
              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <WhatshotIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Track Everything
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Use a food diary or app to track everything you eat and drink.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <MonitorWeightIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Weigh Weekly
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Track your weight weekly to monitor progress and adjust calories.
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
                    Focus on unprocessed foods for better nutrition and satiety.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <WaterDropIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Stay Hydrated
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Drink water before meals to help control portion sizes.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <SelfImprovementIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Be Patient
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Sustainable changes take time. Stay consistent with your plan.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Error Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        className={styles.errorModal}
        PaperProps={{
          className: `${styles.errorModalPaper} ${isDarkMode ? styles.darkMode : styles.lightMode}`,
        }}
      >
        <DialogTitle className={styles.errorModalTitle}>
          <Box className={styles.errorModalHeader}>
            <ErrorOutlineIcon className={styles.errorModalIcon} />
            <Typography variant="h6" className={styles.errorModalHeading}>
              Please Fix the Following
            </Typography>
            <IconButton onClick={handleCloseModal} className={styles.errorModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent className={styles.errorModalContent}>
          <Box className={styles.errorModalList}>
            {modalErrors.map((error, index) => (
              <Box key={index} className={styles.errorModalItem}>
                <WarningIcon className={styles.errorModalItemIcon} />
                <Typography variant="body2" className={styles.errorModalItemText}>
                  {error}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body2" className={styles.errorModalSubtext} align="center">
            Please fill in all required fields correctly to get your personalized results.
          </Typography>
        </DialogContent>
        <DialogActions className={styles.errorModalActions}>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            className={styles.errorModalButton}
            fullWidth
          >
            Got It
          </Button>
        </DialogActions>
      </Dialog>

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

export default Calories;