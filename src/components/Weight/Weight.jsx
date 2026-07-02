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
  Divider,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  MonitorWeight as MonitorWeightIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Timeline as TimelineIcon,
  EmojiEvents as EmojiEventsIcon,
  Whatshot as WhatshotIcon,
  SelfImprovement as SelfImprovementIcon,
  WaterDrop as WaterDropIcon,
  Bedtime as BedtimeIcon,
  Restaurant as RestaurantIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  ErrorOutlined as ErrorOutlineIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarTodayIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styles from './Weight.module.css';

const Weight = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isDarkMode = theme.palette.mode === 'dark';

  // State
  const [weightEntries, setWeightEntries] = useState([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filterPeriod, setFilterPeriod] = useState('all');

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

  // Mock initial data
  useEffect(() => {
    const today = new Date();
    const mockData = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const weight = 75 + Math.sin(i / 5) * 2 + Math.random() * 0.5;
      mockData.push({
        id: i,
        weight: parseFloat(weight.toFixed(1)),
        date: date.toISOString().split('T')[0],
        note: i % 7 === 0 ? 'Good progress!' : '',
      });
    }
    setWeightEntries(mockData);
    setCurrentWeight('75.0');
    setGoalWeight('70.0');
    setTargetDate(new Date(today.setMonth(today.getMonth() + 2)).toISOString().split('T')[0]);
  }, []);

  const handleAddEntry = () => {
    if (!newWeight || !newDate) return;

    const entry = {
      id: Date.now(),
      weight: parseFloat(newWeight),
      date: newDate,
      note: newNote || '',
    };

    setWeightEntries([...weightEntries, entry].sort((a, b) => a.date.localeCompare(b.date)));
    setNewWeight('');
    setNewDate('');
    setNewNote('');
    setModalOpen(false);
  };

  const handleDeleteEntry = () => {
    if (selectedEntry) {
      setWeightEntries(weightEntries.filter(entry => entry.id !== selectedEntry.id));
      setSelectedEntry(null);
      setDeleteModalOpen(false);
    }
  };

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setNewWeight(entry.weight.toString());
    setNewDate(entry.date);
    setNewNote(entry.note || '');
    setEditingId(entry.id);
    setModalOpen(true);
  };

  const handleUpdateEntry = () => {
    if (!newWeight || !newDate || !selectedEntry) return;

    const updatedEntry = {
      ...selectedEntry,
      weight: parseFloat(newWeight),
      date: newDate,
      note: newNote || '',
    };

    setWeightEntries(
      weightEntries.map(entry => 
        entry.id === selectedEntry.id ? updatedEntry : entry
      ).sort((a, b) => a.date.localeCompare(b.date))
    );
    setNewWeight('');
    setNewDate('');
    setNewNote('');
    setEditingId(null);
    setSelectedEntry(null);
    setModalOpen(false);
  };

  const getProgressStats = () => {
    if (weightEntries.length < 2) return null;

    const sorted = [...weightEntries].sort((a, b) => a.date.localeCompare(b.date));
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const totalLost = first.weight - last.weight;
    const avgWeekly = (totalLost / (sorted.length / 7)).toFixed(1);
    const progress = ((first.weight - last.weight) / (first.weight - parseFloat(goalWeight || 70)) * 100).toFixed(0);

    return {
      totalLost: totalLost.toFixed(1),
      avgWeekly: parseFloat(avgWeekly),
      progress: Math.min(100, Math.max(0, parseFloat(progress))),
      firstWeight: first.weight,
      currentWeight: last.weight,
      goalWeight: parseFloat(goalWeight || 70),
    };
  };

  const stats = getProgressStats();

  const filteredEntries = weightEntries.filter(entry => {
    if (filterPeriod === 'all') return true;
    const today = new Date();
    const entryDate = new Date(entry.date);
    const diffDays = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
    if (filterPeriod === 'week') return diffDays <= 7;
    if (filterPeriod === 'month') return diffDays <= 30;
    if (filterPeriod === 'quarter') return diffDays <= 90;
    return true;
  });

  const latestEntries = filteredEntries.slice(-5).reverse();

  return (
    <Box className={`${styles.weightContainer} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      {/* Hero Section */}
      <Box className={styles.heroSection}>
        <Container maxWidth="lg">
          <Box className={styles.heroContent}>
            <Fade in timeout={1000}>
              <Box className={styles.heroTextContainer}>
                <Box className={styles.chipWrapper}>
                  <Chip
                    label="WEIGHT TRACKING"
                    className={styles.heroChip}
                    icon={<MonitorWeightIcon />}
                  />
                </Box>
                <Typography variant="h1" className={styles.heroTitle} align="center">
                  Track Your
                  <span className={styles.heroHighlight}> Weight Journey</span>
                </Typography>
                <Typography variant="body1" className={styles.heroSubtitle} align="center">
                  Monitor your progress, set goals, and stay motivated on your weight
                  loss journey with detailed tracking and analytics.
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Container>
        <IconButton
          className={styles.scrollDownButton}
          onClick={() => document.getElementById('weight-tracker').scrollIntoView({ behavior: 'smooth' })}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      {/* Weight Tracker Section - Centered */}
      <Box id="weight-tracker" className={styles.trackerSection}>
        <Container maxWidth="lg">
          <Box className={styles.trackerWrapper}>
            {/* Stats Cards - Flex with space evenly */}
<Box className={styles.statsContainer}>
  <Box className={styles.statsFlex}>
    {/* Current Weight */}
    <Box className={styles.statCardWrapper}>
      <Zoom in timeout={300}>
        <Paper className={styles.statCard}>
          <Box className={styles.statIconWrapper} style={{ background: 'rgba(233, 69, 96, 0.1)' }}>
            <MonitorWeightIcon className={styles.statIcon} style={{ color: '#e94560' }} />
          </Box>
          <Typography variant="caption" className={styles.statLabel}>
            Current Weight
          </Typography>
          <Typography variant="h4" className={styles.statValue}>
            {currentWeight || '--'}
          </Typography>
          <Typography variant="caption" className={styles.statSub}>
            kg
          </Typography>
        </Paper>
      </Zoom>
    </Box>

    {/* Goal Weight */}
    <Box className={styles.statCardWrapper}>
      <Zoom in timeout={400}>
        <Paper className={styles.statCard}>
          <Box className={styles.statIconWrapper} style={{ background: 'rgba(78, 205, 196, 0.1)' }}>
            <EmojiEventsIcon className={styles.statIcon} style={{ color: '#4ecdc4' }} />
          </Box>
          <Typography variant="caption" className={styles.statLabel}>
            Goal Weight
          </Typography>
          <Typography variant="h4" className={styles.statValue}>
            {goalWeight || '--'}
          </Typography>
          <Typography variant="caption" className={styles.statSub}>
            kg
          </Typography>
        </Paper>
      </Zoom>
    </Box>

    {/* Progress */}
    <Box className={styles.statCardWrapper}>
      <Zoom in timeout={500}>
        <Paper className={styles.statCard}>
          <Box className={styles.statIconWrapper} style={{ background: 'rgba(255, 230, 109, 0.1)' }}>
            <WhatshotIcon className={styles.statIcon} style={{ color: '#ffe66d' }} />
          </Box>
          <Typography variant="caption" className={styles.statLabel}>
            Progress
          </Typography>
          <Typography variant="h4" className={styles.statValue}>
            {stats ? `${stats.progress}%` : '--'}
          </Typography>
          <Box className={styles.progressBar}>
            <LinearProgress
              variant="determinate"
              value={stats ? stats.progress : 0}
              className={styles.progressLinear}
              sx={{
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #4ecdc4, #ffe66d, #e94560)',
                },
              }}
            />
          </Box>
        </Paper>
      </Zoom>
    </Box>

    {/* Total Lost */}
    <Box className={styles.statCardWrapper}>
      <Zoom in timeout={600}>
        <Paper className={styles.statCard}>
          <Box className={styles.statIconWrapper} style={{ background: 'rgba(162, 155, 254, 0.1)' }}>
            {stats && stats.totalLost > 0 ? (
              <TrendingDownIcon className={styles.statIcon} style={{ color: '#4ecdc4' }} />
            ) : (
              <TrendingUpIcon className={styles.statIcon} style={{ color: '#e94560' }} />
            )}
          </Box>
          <Typography variant="caption" className={styles.statLabel}>
            Total Lost
          </Typography>
          <Typography variant="h4" className={styles.statValue}>
            {stats ? `${Math.abs(stats.totalLost)}kg` : '--'}
          </Typography>
          <Typography variant="caption" className={styles.statSub}>
            {stats && stats.totalLost > 0 ? '✅ On track' : '📈 Gained'}
          </Typography>
        </Paper>
      </Zoom>
    </Box>
  </Box>
</Box>

            {/* Controls Paper */}
            <Box className={styles.controlsContainer}>
              <Paper className={styles.controlsPaper}>
                <Box className={styles.controlsHeader}>
                  <Box className={styles.controlsLeft}>
                    <Typography variant="h6" className={styles.controlsTitle}>
                      Weight Entries
                    </Typography>
                    <Chip
                      label={`${filteredEntries.length} entries`}
                      size="small"
                      className={styles.entriesChip}
                    />
                  </Box>
                  <Box className={styles.controlsRight}>
                    <FormControl size="small" className={styles.filterControl}>
                      <Select
                        value={filterPeriod}
                        onChange={(e) => setFilterPeriod(e.target.value)}
                        className={styles.filterSelect}
                      >
                        <MenuItem value="all">All Time</MenuItem>
                        <MenuItem value="week">Last Week</MenuItem>
                        <MenuItem value="month">Last Month</MenuItem>
                        <MenuItem value="quarter">Last 3 Months</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      className={styles.addButton}
                      onClick={() => {
                        setEditingId(null);
                        setSelectedEntry(null);
                        setNewWeight('');
                        setNewDate(new Date().toISOString().split('T')[0]);
                        setNewNote('');
                        setModalOpen(true);
                      }}
                    >
                      Add Entry
                    </Button>
                  </Box>
                </Box>

                {/* Chart Placeholder */}
                <Box className={styles.chartPlaceholder}>
                  <Box className={styles.chartContent}>
                    <ShowChartIcon className={styles.chartIcon} />
                    <Typography variant="body2" className={styles.chartText}>
                      Weight Progress Chart
                    </Typography>
                    <Typography variant="caption" className={styles.chartSubtext}>
                      (Interactive chart coming soon)
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* Table Paper */}
            <Box className={styles.tableContainer}>
              <Paper className={styles.tablePaper}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className={styles.tableHeader}>
                        <TableCell className={styles.tableCell}>Date</TableCell>
                        <TableCell className={styles.tableCell} align="center">Weight (kg)</TableCell>
                        <TableCell className={styles.tableCell}>Change</TableCell>
                        <TableCell className={styles.tableCell}>Note</TableCell>
                        <TableCell className={styles.tableCell} align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {latestEntries.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className={styles.emptyCell}>
                            <Box className={styles.emptyState}>
                              <MonitorWeightIcon className={styles.emptyIcon} />
                              <Typography variant="body1" className={styles.emptyTitle}>
                                No weight entries yet
                              </Typography>
                              <Typography variant="body2" className={styles.emptySubtitle}>
                                Start tracking your weight journey today!
                              </Typography>
                              <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                className={styles.emptyButton}
                                onClick={() => {
                                  setEditingId(null);
                                  setSelectedEntry(null);
                                  setNewWeight('');
                                  setNewDate(new Date().toISOString().split('T')[0]);
                                  setNewNote('');
                                  setModalOpen(true);
                                }}
                              >
                                Add First Entry
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ) : (
                        latestEntries.map((entry, index) => {
                          const prevEntry = index < latestEntries.length - 1 ? latestEntries[index + 1] : null;
                          const change = prevEntry ? (entry.weight - prevEntry.weight).toFixed(1) : null;
                          const isLoss = change && parseFloat(change) < 0;
                          const isGain = change && parseFloat(change) > 0;

                          return (
                            <Grow in timeout={(index + 1) * 100} key={entry.id}>
                              <TableRow className={styles.tableRow}>
                                <TableCell className={styles.tableCell}>
                                  <Box className={styles.dateCell}>
                                    <CalendarTodayIcon className={styles.dateIcon} />
                                    <Typography variant="body2">
                                      {new Date(entry.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                      })}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell align="center" className={styles.tableCell}>
                                  <Typography variant="h6" className={styles.weightCell}>
                                    {entry.weight}
                                  </Typography>
                                </TableCell>
                                <TableCell className={styles.tableCell}>
                                  {change && (
                                    <Chip
                                      icon={isLoss ? <TrendingDownIcon /> : isGain ? <TrendingUpIcon /> : null}
                                      label={`${isLoss ? '' : '+'}${change}kg`}
                                      size="small"
                                      className={`${styles.changeChip} ${isLoss ? styles.lossChip : isGain ? styles.gainChip : styles.stableChip}`}
                                    />
                                  )}
                                </TableCell>
                                <TableCell className={styles.tableCell}>
                                  <Typography variant="body2" className={styles.noteText}>
                                    {entry.note || '—'}
                                  </Typography>
                                </TableCell>
                                <TableCell align="center" className={styles.tableCell}>
                                  <Box className={styles.actionButtons}>
                                    <Tooltip title="Edit">
                                      <IconButton
                                        size="small"
                                        className={styles.actionIcon}
                                        onClick={() => handleEditEntry(entry)}
                                      >
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton
                                        size="small"
                                        className={styles.actionIcon}
                                        onClick={() => {
                                          setSelectedEntry(entry);
                                          setDeleteModalOpen(true);
                                        }}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            </Grow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
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
              Weight Management
              <span className={styles.sectionHighlight}> Tips</span>
            </Typography>
          </Box>

          <Box className={styles.tipsWrapper}>
            <Box className={styles.tipsScrollContainer}>
              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <MonitorWeightIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Weigh Weekly
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Weigh yourself at the same time each week for consistent tracking.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <TimelineIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Track Trends
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Focus on overall trends rather than daily fluctuations.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <RestaurantIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Monitor Diet
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Track your food intake alongside weight for better insights.
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.tipCard}>
                <CardContent className={styles.tipCardContent}>
                  <Box className={styles.tipIconContainer}>
                    <SelfImprovementIcon className={styles.tipIcon} />
                  </Box>
                  <Typography variant="h6" className={styles.tipTitle} align="center">
                    Stay Consistent
                  </Typography>
                  <Typography variant="body2" className={styles.tipDescription} align="center">
                    Consistency is key. Stick to your routine for best results.
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
                    Drink plenty of water to support your weight management goals.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Add/Edit Entry Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingId(null);
          setSelectedEntry(null);
        }}
        maxWidth="sm"
        fullWidth
        className={styles.modal}
        PaperProps={{
          className: `${styles.modalPaper} ${isDarkMode ? styles.darkMode : styles.lightMode}`,
        }}
      >
        <DialogTitle className={styles.modalTitle}>
          <Box className={styles.modalHeader}>
            <MonitorWeightIcon className={styles.modalIcon} />
            <Typography variant="h6" className={styles.modalHeading}>
              {editingId ? 'Edit Weight Entry' : 'Add Weight Entry'}
            </Typography>
            <IconButton
              onClick={() => {
                setModalOpen(false);
                setEditingId(null);
                setSelectedEntry(null);
              }}
              className={styles.modalClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent className={styles.modalContent}>
          <Box className={styles.modalForm}>
            <Box className={styles.formGroup}>
              <Typography variant="body2" className={styles.formLabel}>
                Weight (kg)
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Enter your weight"
                className={styles.modalInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonitorWeightIcon className={styles.inputIcon} />
                    </InputAdornment>
                  ),
                  inputProps: { 
                    step: 0.1,
                    min: 0,
                  },
                }}
              />
            </Box>

            <Box className={styles.formGroup}>
              <Typography variant="body2" className={styles.formLabel}>
                Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className={styles.modalInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon className={styles.inputIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className={styles.formGroup}>
              <Typography variant="body2" className={styles.formLabel}>
                Note (Optional)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note about this entry..."
                className={styles.modalInput}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className={styles.modalActions}>
          <Button
            onClick={() => {
              setModalOpen(false);
              setEditingId(null);
              setSelectedEntry(null);
            }}
            className={styles.modalCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={editingId ? handleUpdateEntry : handleAddEntry}
            variant="contained"
            className={styles.modalSave}
          >
            {editingId ? 'Update Entry' : 'Add Entry'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        maxWidth="xs"
        fullWidth
        className={styles.deleteModal}
        PaperProps={{
          className: `${styles.deleteModalPaper} ${isDarkMode ? styles.darkMode : styles.lightMode}`,
        }}
      >
        <DialogTitle className={styles.deleteModalTitle}>
          <Box className={styles.deleteModalHeader}>
            <ErrorOutlineIcon className={styles.deleteModalIcon} />
            <Typography variant="h6" className={styles.deleteModalHeading}>
              Delete Entry?
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent className={styles.deleteModalContent}>
          <Typography variant="body2" className={styles.deleteModalText}>
            Are you sure you want to delete this weight entry?
            {selectedEntry && (
              <Box className={styles.deleteEntryPreview}>
                <Typography variant="body2">
                  <strong>Weight:</strong> {selectedEntry.weight} kg
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {new Date(selectedEntry.date).toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </Typography>
          <Typography variant="caption" className={styles.deleteModalWarning}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions className={styles.deleteModalActions}>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            className={styles.deleteModalCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteEntry}
            variant="contained"
            className={styles.deleteModalConfirm}
          >
            Delete
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

export default Weight;