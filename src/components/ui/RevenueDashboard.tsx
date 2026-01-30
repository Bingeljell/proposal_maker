import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus, BarChart3, PieChart, Calendar, Trophy, DollarSign, FileText, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, Archive } from 'lucide-react';
import { useCurrency } from '../../hooks/useCurrency';
import { useProposalAnalytics, type DealStatus } from '../../hooks/useProposalAnalytics';
import { Proposal } from '../../types';
import { 
  formatPercentage, 
  calculateTrend,
  calculateProposalTotal,
  getMaxMonthlyValue,
} from '../../utils/analytics';

interface RevenueDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal;
}

type ViewMode = 'overview' | 'monthly' | 'top';

export const RevenueDashboard: React.FC<RevenueDashboardProps> = ({
  isOpen,
  onClose,
  proposal,
}) => {
  const { formatAmount, formatAmountShort } = useCurrency();
  const { 
    analytics, 
    proposals, 
    isLoading, 
    refresh, 
    updateProposalDealStatus,
  } = useProposalAnalytics(proposal);
  
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [showArchiveHint, setShowArchiveHint] = useState(true);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStatusChange = (proposalId: string, status: DealStatus) => {
    updateProposalDealStatus(proposalId, status);
  };

  // Calculate trend (compare last month to previous month)
  const lastMonth = analytics.monthlyData[analytics.monthlyData.length - 1];
  const prevMonth = analytics.monthlyData[analytics.monthlyData.length - 2];
  const monthlyTrend = lastMonth && prevMonth 
    ? calculateTrend(lastMonth.pipelineValue, prevMonth.pipelineValue)
    : 0;

  // Status badge component
  const StatusBadge: React.FC<{ 
    status: DealStatus; 
    proposalId: string;
  }> = ({ status, proposalId }) => {
    const statusConfig: Record<DealStatus, { icon: typeof CheckCircle; label: string; color: string; bg: string }> = {
      won: { icon: CheckCircle, label: 'Won', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
      lost: { icon: XCircle, label: 'Lost', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
      pending: { icon: Clock, label: 'Pending', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <div className="relative group">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
          <Icon size={14} />
          {config.label}
          <ChevronDown size={12} className="opacity-50" />
        </span>
        
        {/* Status dropdown */}
        <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[120px]">
          {(['won', 'lost', 'pending'] as DealStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(proposalId, s)}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                s === status ? 'font-medium' : ''
              }`}
            >
              {s === 'won' && <CheckCircle size={14} className="text-green-500" />}
              {s === 'lost' && <XCircle size={14} className="text-red-500" />}
              {s === 'pending' && <Clock size={14} className="text-amber-500" />}
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Stat card component
  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subValue?: string;
    icon: React.ElementType;
    color: 'blue' | 'green' | 'amber' | 'purple' | 'red';
    trend?: number;
  }> = ({ title, value, subValue, icon: Icon, color, trend }) => {
    const colorClasses = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
      amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
    };

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {value}
            </p>
            {subValue && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subValue}</p>
            )}
          </div>
          <div className={`p-2 rounded-lg border ${colorClasses[color]}`}>
            <Icon size={20} />
          </div>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-xs ${
            trend > 0 ? 'text-green-600 dark:text-green-400' : 
            trend < 0 ? 'text-red-600 dark:text-red-400' : 
            'text-gray-500 dark:text-gray-400'
          }`}>
            {trend > 0 ? <TrendingUp size={14} /> : trend < 0 ? <TrendingDown size={14} /> : <Minus size={14} />}
            <span>{Math.abs(trend).toFixed(1)}% from last month</span>
          </div>
        )}
      </div>
    );
  };

  // Progress bar component
  const ProgressBar: React.FC<{ 
    value: number; 
    max: number; 
    color: string;
    label?: string;
  }> = ({ value, max, color, label }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600 dark:text-gray-400">{label}</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">{formatPercentage(percentage, 0)}</span>
          </div>
        )}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  // Monthly chart component
  const MonthlyChart: React.FC = () => {
    
    return (
      <div className="space-y-4">
        {analytics.monthlyData.map((month) => (
          <div 
            key={month.month} 
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setExpandedMonth(expandedMonth === month.month ? null : month.month)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-gray-100">{month.monthLabel}</span>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {month.proposalsCount} proposals
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatAmount(month.pipelineValue)}
                </span>
                {expandedMonth === month.month ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            
            {/* Stacked bar visualization */}
            <div className="flex h-6 rounded-full overflow-hidden">
              {month.wonValue > 0 && (
                <div 
                  className="bg-green-500 dark:bg-green-600"
                  style={{ width: `${(month.wonValue / month.pipelineValue) * 100}%` }}
                  title={`Won: ${formatAmount(month.wonValue)}`}
                />
              )}
              {month.pendingValue > 0 && (
                <div 
                  className="bg-amber-500 dark:bg-amber-600"
                  style={{ width: `${(month.pendingValue / month.pipelineValue) * 100}%` }}
                  title={`Pending: ${formatAmount(month.pendingValue)}`}
                />
              )}
              {month.lostValue > 0 && (
                <div 
                  className="bg-red-500 dark:bg-red-600"
                  style={{ width: `${(month.lostValue / month.pipelineValue) * 100}%` }}
                  title={`Lost: ${formatAmount(month.lostValue)}`}
                />
              )}
            </div>
            
            {/* Expanded details */}
            {expandedMonth === month.month && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Won
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatAmount(month.wonValue)} ({month.wonCount})
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Pending
                  </span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {formatAmount(month.pendingValue)} ({month.pendingCount})
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Lost
                  </span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    {formatAmount(month.lostValue)} ({month.lostCount})
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Top proposals list
  const TopProposalsList: React.FC = () => {
    return (
      <div className="space-y-2">
        {analytics.topProposals.map((p, index) => {
          const value = calculateProposalTotal(p);
          const isCurrent = p.id === proposal.id;
          
          return (
            <div 
              key={p.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                isCurrent 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  index === 1 ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                  index === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {p.meta.title}
                    {isCurrent && <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(Current)</span>}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{p.meta.clientName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{formatAmount(value)}</p>
                <div className="mt-1">
                  <StatusBadge status={p.dealStatus || 'pending'} proposalId={p.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Revenue Dashboard</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {analytics.totalProposals} proposals • {formatPercentage(analytics.winRate)} win rate
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Refresh data"
            >
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* View tabs */}
        <div className="px-5 pt-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            {[
              { id: 'overview', label: 'Overview', icon: PieChart },
              { id: 'monthly', label: 'Monthly Trends', icon: Calendar },
              { id: 'top', label: 'Top Proposals', icon: Trophy },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as ViewMode)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  viewMode === tab.id
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : (
            <>
              {/* Archive hint */}
              {showArchiveHint && proposals.length === 1 && (
                <div className="mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3">
                  <Archive className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Tip:</strong> Import previous proposals to see comprehensive analytics. 
                      Save proposals as JSON files and load them to build your dashboard over time.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowArchiveHint(false)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {viewMode === 'overview' && (
                <div className="space-y-6">
                  {/* Stats grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                      title="Total Proposals"
                      value={analytics.totalProposals}
                      subValue={`${analytics.proposalsByStatus.won} won, ${analytics.proposalsByStatus.lost} lost, ${analytics.proposalsByStatus.pending} pending`}
                      icon={FileText}
                      color="blue"
                    />
                    <StatCard
                      title="Pipeline Value"
                      value={formatAmountShort(analytics.totalPipelineValue)}
                      subValue={formatAmount(analytics.totalPipelineValue)}
                      icon={DollarSign}
                      color="purple"
                      trend={monthlyTrend}
                    />
                    <StatCard
                      title="Won Revenue"
                      value={formatAmountShort(analytics.wonRevenue)}
                      subValue={`${formatPercentage(analytics.conversionRate)} conversion rate`}
                      icon={TrendingUp}
                      color="green"
                    />
                    <StatCard
                      title="Win Rate"
                      value={formatPercentage(analytics.winRate)}
                      subValue={`${analytics.proposalsByStatus.won} of ${analytics.proposalsByStatus.won + analytics.proposalsByStatus.lost} decided`}
                      icon={CheckCircle}
                      color="amber"
                    />
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Status breakdown */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Proposals by Status</h3>
                      <div className="space-y-4">
                        <ProgressBar
                          value={analytics.proposalsByStatus.won}
                          max={analytics.totalProposals}
                          color="bg-green-500 dark:bg-green-600"
                          label={`Won (${analytics.proposalsByStatus.won})`}
                        />
                        <ProgressBar
                          value={analytics.proposalsByStatus.pending}
                          max={analytics.totalProposals}
                          color="bg-amber-500 dark:bg-amber-600"
                          label={`Pending (${analytics.proposalsByStatus.pending})`}
                        />
                        <ProgressBar
                          value={analytics.proposalsByStatus.lost}
                          max={analytics.totalProposals}
                          color="bg-red-500 dark:bg-red-600"
                          label={`Lost (${analytics.proposalsByStatus.lost})`}
                        />
                      </div>
                      
                      {/* Value breakdown */}
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Won</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{formatAmountShort(analytics.wonRevenue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
                          <p className="font-semibold text-amber-600 dark:text-amber-400">{formatAmountShort(analytics.pendingValue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Lost</p>
                          <p className="font-semibold text-red-600 dark:text-red-400">{formatAmountShort(analytics.lostRevenue)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Average deal size & quick stats */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Deal Statistics</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <span className="text-gray-600 dark:text-gray-400">Average Deal Size</span>
                          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {formatAmount(analytics.averageDealSize)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-xs text-green-600 dark:text-green-400">Avg Won Deal</p>
                            <p className="font-semibold text-green-700 dark:text-green-300">
                              {analytics.proposalsByStatus.won > 0 
                                ? formatAmountShort(analytics.wonRevenue / analytics.proposalsByStatus.won)
                                : '-'}
                            </p>
                          </div>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <p className="text-xs text-red-600 dark:text-red-400">Avg Lost Deal</p>
                            <p className="font-semibold text-red-700 dark:text-red-300">
                              {analytics.proposalsByStatus.lost > 0 
                                ? formatAmountShort(analytics.lostRevenue / analytics.proposalsByStatus.lost)
                                : '-'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mini monthly preview */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Pipeline Trend (Last 6 Months)</h3>
                      <button
                        onClick={() => setViewMode('monthly')}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Details →
                      </button>
                    </div>
                    <div className="h-32 flex items-end gap-2">
                      {analytics.monthlyData.map((month) => {
                        const maxValue = getMaxMonthlyValue(analytics.monthlyData);
                        const height = maxValue > 0 ? (month.pipelineValue / maxValue) * 100 : 0;
                        
                        return (
                          <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-md transition-all duration-500 hover:bg-blue-600 dark:hover:bg-blue-500 relative group"
                              style={{ height: `${Math.max(height, 4)}%` }}
                            >
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {formatAmountShort(month.pipelineValue)}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {month.monthLabel.split(' ')[0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'monthly' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Monthly Breakdown</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-green-500" />
                        Won
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        Pending
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        Lost
                      </span>
                    </div>
                  </div>
                  <MonthlyChart />
                </div>
              )}

              {viewMode === 'top' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Top 5 Highest Value Proposals</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click status badge to change
                    </p>
                  </div>
                  <TopProposalsList />
                  
                  {analytics.topProposals.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No proposals with value data yet</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Data is stored locally in your browser. Export proposals as JSON to keep historical records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
