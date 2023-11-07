import type { Request, Response } from 'express';

import UserModel from '../models/userModel';

export const updateThemeByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id: id } = req.params;
  const {
    light_theme,
    // login, avatar
  } = req.body;
  try {
    const [updatedRowsCount, updatedThemes] = await UserModel.update(
      {
        light_theme,
        // login, avatar
      },
      {
        where: {
          id,
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
