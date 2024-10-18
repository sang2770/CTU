import { Theme } from '@mui/material/styles';

export default function componentStyleOverrides(theme: Theme, borderRadius: number, outlinedFilled: boolean) {
    const mode = theme.palette.mode;

    return {
        MuiBox: {
            styleOverrides: {
                root: {
                    borderRadius: `${borderRadius}px`,
                },
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.background.paper,
                },
                rounded: {
                    borderRadius: `${borderRadius}px`
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: theme.palette.background.paper,
                    background: theme.palette.text.primary
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    color: theme.palette.grey[600],
                    borderRadius: borderRadius,
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${mode === 'dark'?theme.palette.grey[700]:theme.palette.grey[400]}`,
                    p: "6px",
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.text.secondary,
                        border: 0,
                        '& .MuiListItemIcon-root': {
                            color: mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark
                        }
                    },
                    "&.Mui-selected": {
                        border: `1px solid ${mode === 'dark'?theme.palette.grey[700]:theme.palette.grey[400]}`,
                        backgroundColor: theme.palette.primary.main,
                        color: mode === 'dark'?theme.palette.text.primary :theme.palette.text.secondary,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                            color: mode === 'dark'?theme.palette.text.primary :theme.palette.text.secondary,
                        }
                    },
                },
                outlined: {
                    border: `1px solid ${mode === 'dark'?theme.palette.grey[700]:theme.palette.grey[400]}`,
                    "&.Mui-selected": {
                        border: 0,
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            border: 0,
                            backgroundColor: mode === 'dark'?theme.palette.primary.main :theme.palette.primary.dark,
                        }
                    },
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                
                input: {
                    color: theme.palette.text.primary,
                    '&::placeholder': {
                        color: theme.palette.text.primary,
                        fontSize: '0.875rem'
                    },
                    border: 1
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                    borderRadius: `${borderRadius}px`,
                    border: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.palette.primary.light,
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    },

                },
                input: {
                    background: 'transparent',
                    borderRadius: `${borderRadius}px`,
                    border: 1
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: `${borderRadius}px`
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: `${borderRadius}px`,
                    // border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300]}`
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300]}`,
                    // '&.MuiTableCell-head': {
                    //     fontSize: '0.875rem',
                    //     color: theme.palette.grey[600],
                    //     fontWeight: 500
                    // }
                }
            }
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: `${borderRadius}px`,
                    color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.dark,
                    "&:disabled": {
                        backgroundColor: theme.palette.grey[400],
                    }
                },
                outlined: {
                    border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.primary.dark}`,
                    '&:hover': {
                        border: `1px solid ${theme.palette.primary.dark}`,
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.text.secondary,

                    }
                },
                contained: {
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.mode === "dark" ?theme.palette.text.primary:theme.palette.text.secondary,
                }
            }
        },

    }
}
