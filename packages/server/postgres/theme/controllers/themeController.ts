import type { Request, Response } from 'express';

import ThemeModel from '../models/themeModel';

export const getThemeByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id } = req.params;
  try {
    const theme = await ThemeModel.findOne({
      where: {
        user_id,
      },
    });
    if (theme) {
      res.status(200).json(theme);
    } else {
      // Creating default theme if doesn't exist for the user
      try {
        ThemeModel.create({
          ...req.body,
          user_id,
        });
        const theme = await ThemeModel.findOne({
          where: {
            user_id,
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
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const createThemeByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id } = req.params;

  try {
    ThemeModel.create({
      ...req.body,
      user_id,
    })
      .then((message) => {
        res.status(200).json(message);
      })
      .catch(() => {
        res.status(400).json({ message: 'Bad request' });
      });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateThemeByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id } = req.params;
  const { light_theme } = req.body;
  try {
    const [updatedRowsCount, updatedThemes] = await ThemeModel.update(
      { light_theme },
      {
        where: {
          user_id,
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
