import { Request, Response } from 'express';

import ThemeModel from '../models/themeModel';

export const getThemeByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;

  try {
    const theme = await ThemeModel.findOne({
      where: {
        user_id: userId,
      },
    });

    if (theme) {
      res.status(200).json(theme);
    } else {
      res
        .status(404)
        .json({ message: 'Theme not found for the given user ID.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

interface ThemeCreationAttributes {
  user_id: string;
  light_theme: boolean;
}

export const createThemeByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId, lightTheme } = req.body;

  try {
    const theme: ThemeCreationAttributes = {
      user_id: userId,
      light_theme: lightTheme,
    };
    res.status(201).json(theme);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateThemeByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;
  const { lightTheme } = req.body;

  try {
    const [updatedRowsCount, updatedThemes] = await ThemeModel.update(
      { light_theme: lightTheme },
      {
        where: {
          user_id: userId,
        },
        returning: true,
      },
    );

    if (updatedRowsCount > 0) {
      res.status(200).json(updatedThemes[0]);
    } else {
      res
        .status(404)
        .json({ message: 'Theme not found for the given user ID.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
